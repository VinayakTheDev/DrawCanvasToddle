//
//  DrawCanvas.m
//  Toddle
//
//  Created by Raj Jakasaniya on 07/07/20.
//

// CanvasViewManager.m


#import <React/RCTViewManager.h>
#import <React/RCTConvert.h>

@interface
RCT_EXTERN_MODULE(CanvasDrawViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth , NSNumber)
RCT_EXPORT_VIEW_PROPERTY(strokeColor , NSString)
RCT_EXPORT_VIEW_PROPERTY(drawImagePath, NSString)
RCT_EXTERN_METHOD(clearCanvas:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(toggle:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(save:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(undo:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(redo:(nonnull NSNumber *)node)
RCT_EXPORT_VIEW_PROPERTY(onSaved, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)
@end

  