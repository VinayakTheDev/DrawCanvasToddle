package com.toddle;

import android.graphics.Color;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CalendarView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ReactImageView;

public class CanvasDrawViewManager extends ViewGroupManager<CanvasDrawView> {

    public static final String REACT_CLASS = "CanvasDrawView";
    public static final int CLEAR = 1;
    public static final int SAVE = 2;
    public static final int UNDO = 3;
    public static final int REDO = 4;
    public static final int TOGGLE = 5;

    ReactApplicationContext mCallerContext;
    CanvasDrawView canvasDrawView;
    public CanvasDrawViewManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @NonNull
    @Override
    protected CanvasDrawView createViewInstance(@NonNull ThemedReactContext reactContext) {
        CanvasDrawView canvasDrawView = new CanvasDrawView(reactContext, null);
        this.canvasDrawView = canvasDrawView;
        return canvasDrawView;
    }

    @ReactProp(name="strokeWidth", defaultInt = 2)
    public void  setStrokeWidth(CanvasDrawView view, int strokeWidth) {
        view.setStrokeWidth(strokeWidth);
    }

    @ReactProp(name="strokeColor")
    public void  setStrokeColor(CanvasDrawView view, String strokeColor) {
        int parseColor = Color.parseColor(strokeColor);
        view.setStrokeColor(parseColor);
    }

    @ReactMethod
    public void  toggle(Boolean erase) {

    }

    @Override
    public void receiveCommand(
            CanvasDrawView view,
            int commandType,
            @Nullable ReadableArray args) {
        Assertions.assertNotNull(view);
        Assertions.assertNotNull(args);
        switch (commandType) {
            case CLEAR: {
                view.clearCanvas();
                return;
            }
            case UNDO: {
                view.undo();
                return;
            }
            case REDO: {
                view.redo();
                return;
            }
            case SAVE: {
                view.save();
                return;
            }
            case TOGGLE: {
                assert args != null;
                view.toggle();
                return;
            }
            default:
                throw new IllegalArgumentException(
                        String.format(
                                "Unsupported command %d received by %s.",
                                commandType,
                                getClass().getSimpleName()
                        )
                );
        }
    }

    @ReactMethod
    public void  clearCanvas() {
        canvasDrawView.clearCanvas();
    }

    @ReactMethod
    public void  undo() {
        canvasDrawView.undo();
    }

    @ReactMethod
    public void  redo() {
        canvasDrawView.redo();
    }


}
