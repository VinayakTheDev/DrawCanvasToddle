package com.toddle;


import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.os.Environment;
import android.util.AttributeSet;
import android.util.DisplayMetrics;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReactContext;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class CanvasDrawView extends ViewGroup {
    private  Paint paint;
    private Path path;
    private ArrayList<Path> paths = new ArrayList<Path>();
    private ArrayList<Path> undonePaths = new ArrayList<Path>();
    private Canvas canvas;
    Bitmap bitmap;
    float strokeWidth;
    int strokeColor;
    Context context;
    private Activity activity = null;
    public float getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(float strokeWidth) {
        this.strokeWidth = strokeWidth;
    }

    public int getStrokeColor() {
        return strokeColor;
    }

    public void setStrokeColor(int strokeColor) {
        this.strokeColor = strokeColor;
    }



    public CanvasDrawView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        this.context = context;
        this.activity = ((ReactContext) getContext()).getCurrentActivity();
        paint = new Paint();
        path = new Path();
        paint.setAntiAlias(true);
        paint.setColor(Color.RED);
        paint.setStrokeJoin(Paint.Join.ROUND);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(strokeWidth);



        DisplayMetrics metrics = context.getResources().getDisplayMetrics();
        int width = metrics.widthPixels;
        int height = metrics.heightPixels;

        bitmap = BitmapFactory.decodeResource(context.getResources(),R.drawable.mountains);
        bitmap = Bitmap.createScaledBitmap(bitmap, width, height, false);
        canvas = new Canvas(bitmap);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {

    }

    @Override
    protected void onDraw(android.graphics.Canvas canvas) {
        super.onDraw(canvas);
//        canvas.drawPath(path, paint);

        canvas.drawBitmap(bitmap, 0,0, paint);
        this.canvas = canvas;
        for (Path p : paths){
            canvas.drawPath(p, paint);
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        float xPos = event.getX();
        float yPos = event.getY();

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                path.moveTo(xPos, yPos);
                undonePaths.clear();
                break;
            case MotionEvent.ACTION_MOVE:
                path.lineTo(xPos, yPos);
                break;
            case MotionEvent.ACTION_UP:
                canvas.drawPath(path, paint);
                // kill this so we don't double draw
                path = new Path();
                paths.add(path);
                break;
            default:
                return false;
        }
        invalidate();
        return  true;
    }



    public void clearCanvas() {
        for (Path p : paths){
            p.reset();
        }
        invalidate();
    }

    public void undo() {
        if (paths.size()>0) {
            undonePaths.add(paths.remove(paths.size()-1));
            invalidate();
        }
    }

    public void redo() {
        if (undonePaths.size()>0) {
            paths.add(undonePaths.remove(undonePaths.size()-1));
            invalidate();
        }
    }

    public Bitmap save() {
        getBitmap();
        new ImageSaver(context).setFileName("canvasDraw.jpg")
                .save(bitmap);
        return bitmap;
    }

    private String saveToInternalStorage(Bitmap bitmapImage){
        ContextWrapper cw = new ContextWrapper(context);
        // path to /data/data/yourapp/app_data/imageDir
        File directory = cw.getDir("imageDir", Context.MODE_PRIVATE);
        // Create imageDir
        File mypath=new File(directory,"profile.jpg");

        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(mypath);
            // Use the compress method on the BitMap object to write image to the OutputStream
            bitmapImage.compress(Bitmap.CompressFormat.PNG, 100, fos);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return directory.getAbsolutePath();
    }


    public Bitmap getBitmap()
    {

        this.setDrawingCacheEnabled(true);
        this.buildDrawingCache();
        Bitmap bmp = Bitmap.createBitmap(this.getDrawingCache());
        this.setDrawingCacheEnabled(false);
        bitmap = bmp;

        return bmp;
    }



    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {

        File file = new File(Environment.getExternalStorageDirectory() + "/sign.jpg");
        switch (requestCode) {
            case 0:
                try {
                    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, new FileOutputStream(file));
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
        }
    }

    public void toggle() {

    }
}
