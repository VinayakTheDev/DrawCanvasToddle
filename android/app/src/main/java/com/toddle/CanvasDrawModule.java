package com.toddle;



import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.annotations.ReactProp;
import android.graphics.Color;

import java.util.Map;
import java.util.HashMap;

public class CanvasDrawModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private CanvasDrawView canvasDrawView;
    CanvasDrawModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        canvasDrawView = new CanvasDrawView(context, null);
    }

    @NonNull
    @Override
    public String getName() {
        return  "CanvasDraw";
    }


}
