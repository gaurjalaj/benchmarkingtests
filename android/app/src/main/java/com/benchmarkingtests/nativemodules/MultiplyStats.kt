package com.benchmarkingtests.nativemodules

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.gson.Gson
import com.ziroh.infinity.MultiplyIterative
import com.ziroh.infinity.MultiplyParallel
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch


class MultiplyStats(context: ReactApplicationContext): ReactContextBaseJavaModule() {
    private val MODULENAME = "MultiplyStats"

    override fun getName(): String {
        return MODULENAME
    }

    @OptIn(DelicateCoroutinesApi::class)
    @ReactMethod
    fun multiplyParallel(count: Int, promise: Promise){
        try {
            GlobalScope.launch {
                val multiplier = MultiplyParallel()
                val result = multiplier.multiply(count)
                Log.d(MODULENAME, result.toString())
                promise.resolve(Gson().toJson(result))
            }
        }catch (ex: Exception){
            promise.reject(ex)
        }
    }

    @OptIn(DelicateCoroutinesApi::class)
    @ReactMethod
    fun multiplyIterative(count: Int, promise: Promise){
        try {
            GlobalScope.launch {
                val multiplier = MultiplyIterative()
                val result = multiplier.multiply(count)
                Log.d(MODULENAME, result.toString())
                promise.resolve(Gson().toJson(result))
            }
        }catch (ex: Exception){
            promise.reject(ex)
        }
    }

}