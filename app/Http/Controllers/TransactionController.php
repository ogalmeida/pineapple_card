<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Exception;

class TransactionController extends Controller
{
    public function getTransactions(){

        try{
            $card = auth('api')->user()->card;

            if(!$card){
                throw new Exception('O cartão não foi encontrado!');
            }

            $invoice_period = request()->get('date');

            $payment_day = $card->payment_date;

            $invoice_end = Carbon::createFromFormat('m/Y', $invoice_period)->addMonths(1)->startOfMonth()->addDays($payment_day - 1)->subDays(10)->format('Y-m-d');
            $invoice_start = Carbon::createFromFormat('m/Y', $invoice_period)->startOfMonth()->addDays($payment_day - 1)->subDays(10)->format('Y-m-d');

            $transactions = auth('api')->user()->transactions()->whereBetween('release_date', [$invoice_start, $invoice_end])->orderBy('release_date', 'desc')->get();

            $invoice = $card->invoices()->where(['reference_month' => explode('/', $invoice_period)[0], 'reference_year' => explode('/', $invoice_period)[1]])->first();

            return response()->json(['transactions' => $transactions, 'invoice' => $invoice]);

        } catch(Exception $e){

            return response()->json(['message' => $e->getMessage() ? : 'Erro interno.'], 500);
        }
    }

    public function getTransactionsInfo(){
        $firstTransaction = auth('api')->user()->transactions()->orderBy('release_date', 'asc')->orderBy('release_hour', 'asc')->first()->release_date;
        $lastTransaction = auth('api')->user()->transactions()->orderBy('release_date', 'desc')->orderBy('release_hour', 'desc')->first()->release_date;
        $firstDate = Carbon::createFromDate($firstTransaction)->format('m/Y');
        $lastDate = Carbon::createFromDate($lastTransaction)->format('m/Y');
        return response()->json(['first' => $firstDate, 'last' => $lastDate]);
    }
}
