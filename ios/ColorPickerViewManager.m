//
//  ColorPickerViewManager.m
//  Toddle
//
//  Created by Raj Jakasaniya on 08/07/20.
//


#import <React/RCTViewManager.h>
#import <React/RCTConvert.h>

@interface
RCT_EXTERN_MODULE(ColorPickerViewManager, RCTViewManager)
RCT_EXTERN_METHOD(show:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(hide:(nonnull NSNumber *)node)
RCT_EXPORT_VIEW_PROPERTY(onSelected, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCancelled, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onColorChange, RCTDirectEventBlock)
@end
