package com.toddle;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.image.ReactImageManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CanvasDrawPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(
            ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new CanvasDrawViewManager(reactContext)
        );
    }


    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new CanvasDrawModule(reactContext));

        return modules;
    }

}