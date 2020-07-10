//
//  ColorPickerManager.swift
//  Toddle
//
//  Created by Raj Jakasaniya on 08/07/20.
//

import Foundation
import UIKit

@objc(ColorPickerViewManager)
class ColorPickerViewManager: RCTViewManager, ColorPickerDelegate {
  var colorPicker: ColorPickerView!

  override func view() -> UIView! {
    colorPicker = ColorPickerView()
    colorPicker.frame = CGRect(x: 200, y: 200, width: 200, height: 200)
    colorPicker.delegate = self
    colorPicker.layer.cornerRadius = colorPicker.frame.width/2
    colorPicker.clipsToBounds = true
    colorPicker.layer.borderColor = UIColor.black.cgColor
    colorPicker.layer.borderWidth = 4
    return colorPicker
  }
  
  func ColorColorPickerTouched(sender: ColorPickerView, color: UIColor, point: CGPoint, state: UIGestureRecognizer.State) {
    colorPicker.setColor(color: color)
  }
  

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc public func show(_ node: NSNumber) {
    colorPicker.isHidden = false
  }
  @objc public func hide(_ node: NSNumber) {
    colorPicker.isHidden = true
  }
  
  
}


