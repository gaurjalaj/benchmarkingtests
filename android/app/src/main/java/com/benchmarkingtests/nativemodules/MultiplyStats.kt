package com.benchmarkingtests.nativemodules

import android.os.Build
import android.os.Environment
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.google.gson.Gson
import com.ziroh.infinity.MultiplyIterative
import com.ziroh.infinity.MultiplyParallel
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream
import java.io.IOException


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
                var result = multiplier.multiply(count)
                Log.d(MODULENAME, "Resolvingnow")
                promise.resolve("Success")
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
                promise.resolve(Gson().toJson(result))
            }
        }catch (ex: Exception){
            promise.reject(ex)
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun saveToDownloads(fileData: String, fileName: String, promise: Promise){
        try {
            val fileBytes = fileData.toByteArray()
            saveFileToDownloads(fileBytes, fileName)
            promise.resolve("SUCCESS")
        }catch(ex: Exception){
            promise.reject(ex);
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun saveToDownloadsToCustomDir(fileData: String, directoryName: String, fileName: String, promise: Promise){
        try {
            val fileBytes = fileData.toByteArray()
            saveFileToCustomDirectory(fileBytes, directoryName, fileName)
            promise.resolve("SUCCESS")
        }catch(ex: Exception){
            promise.reject(ex);
        }
    }

     private fun saveFileToDownloads(fileBytes: ByteArray, fileName: String) {
        // Get the Downloads directory
        val downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
        val file = File(downloadsDir, fileName)

        var fos: FileOutputStream? = null
        try {
            fos = FileOutputStream(file)
            fos.write(fileBytes)
            fos.flush()
        } catch (e: IOException) {
            e.printStackTrace()
        } finally {
            fos?.close()
        }
    }

    private fun saveFileToCustomDirectory(fileBytes: ByteArray, directoryName: String, fileName: String) {
        // Get the Downloads directory
        val downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)

        // Create a new directory inside the Downloads directory
        val customDir = File(downloadsDir, directoryName)
        if (!customDir.exists()) {
            customDir.mkdirs()  // Create the directory if it doesn't exist
        }

        // Create the file inside the new directory
        val file = File(customDir, fileName)

        var fos: FileOutputStream? = null
        try {
            fos = FileOutputStream(file)
            fos.write(fileBytes)
            fos.flush()
        } catch (e: IOException) {
            e.printStackTrace()
        } finally {
            fos?.close()
        }
    }


}