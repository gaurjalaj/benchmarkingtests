package com.benchmarkingtests.nativemodules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.PrintStream;

public class SystemOutLogModule extends ReactContextBaseJavaModule {
    public SystemOutLogModule(ReactApplicationContext reactContext) {
        super(reactContext);
        redirectSystemOut();
    }

    @Override
    public String getName() {
        return "SystemOutLogModule";
    }

    private void redirectSystemOut() {
        PrintStream printStream = new PrintStream(new LoggingOutputStream());
        System.setOut(printStream);
    }

    private void sendLogToJS(String message) {
        WritableMap params = new WritableNativeMap();
        params.putString("log", message);

        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("SystemOutLogEvent", params);
    }

    private class LoggingOutputStream extends java.io.OutputStream {
        private StringBuilder buffer = new StringBuilder();

        @Override
        public void write(int b) {
            char c = (char) b;
            if (c == '\n') {
                sendLogToJS(buffer.toString());
                buffer.setLength(0);
            } else {
                buffer.append(c);
            }
        }
    }
}