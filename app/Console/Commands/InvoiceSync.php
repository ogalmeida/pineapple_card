<?php

namespace App\Console\Commands;

use App\Models\Card;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Console\Command;

class InvoiceSync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoice:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sincroniza as faturas';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Invoice::query()->delete();
        $cards = Card::all();
        $status = ['closed', 'payd'];


        foreach($cards as $card){
            $firstCardTransactionDate = $card->transactions()->orderBy('release_date', 'asc')->orderBy('release_hour', 'asc')->first()->release_date;
            $lastCardTransactionDate = $card->transactions()->orderBy('release_date', 'desc')->orderBy('release_hour', 'desc')->first()->release_date;

            $referenceMonth = Carbon::createFromDate($firstCardTransactionDate)->format('m');
            $referenceYear = Carbon::createFromDate($firstCardTransactionDate)->format('Y');

            $lastMonth = Carbon::createFromDate($lastCardTransactionDate)->format('m');
            $lastYear = Carbon::createFromDate($lastCardTransactionDate)->format('Y');

            while(($referenceMonth <= $lastMonth)  || (($referenceMonth > $lastMonth) && ($referenceYear < $lastYear))){
                $invoice_period = $referenceMonth.'/'.$referenceYear;

                $payment_day = $card->payment_date;

                $invoice_end = Carbon::createFromFormat('m/Y', $invoice_period)->addMonths(1)->startOfMonth()->addDays($payment_day - 1)->subDays(10)->format('Y-m-d');
                $invoice_start = Carbon::createFromFormat('m/Y', $invoice_period)->startOfMonth()->addDays($payment_day - 1)->subDays(10)->format('Y-m-d');

                $invoiceValue = $card->transactions()->whereBetween('release_date', [$invoice_start, $invoice_end])->sum('release_value');

                $invoiceExpiration = Carbon::createFromDate($invoice_end)->addDays(10)->format('Y-m-d');

                Invoice::create([
                    'reference_month' => $referenceMonth,
                    'reference_year' => $referenceYear,
                    'card_id' => $card->id,
                    'status' => $referenceMonth == $lastMonth ? 'open' : $status[array_rand($status)],
                    'value' => $invoiceValue,
                    'invoice_expiration' => $invoiceExpiration
                ]);

                dump('---------------------------------');
                dump('Cartão: '.$card->id);
                dump('Começando em: '.$invoice_start);
                dump('Terminando em: '.$invoice_end);
                dump('Referência: '.$invoice_end);
                dump('Vencimento em: '.$invoiceExpiration);
                dump('Valor: R$'.$invoiceValue);
                dump('---------------------------------');

                if((int) $referenceMonth != 12){
                    $referenceMonth = (int) $referenceMonth + 1;
                } else {
                    $referenceMonth = '01';
                    $referenceYear = (int) $referenceYear + 1;
                }
            }
        }
    }
}
