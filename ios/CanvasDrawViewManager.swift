//
//  Canvas.swift
//  DrawCanvas
//
//  Created by Raj Jakasaniya on 07/07/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import UIKit


@objc(CanvasDrawViewManager)
class CanvasDrawViewManager: RCTViewManager {
  var canvas: CanvasDrawView!
  override func view() -> UIView! {
    canvas = CanvasDrawView()
    return canvas
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc public func clearCanvas(_ node: NSNumber) {
    canvas.clearCanvas()
  }
  @objc public func redo(_ node: NSNumber) {
     canvas.redo()
   }
  @objc public func undo(_ node: NSNumber) {
     canvas.undo()
   }
  
  @objc public func save(_ node: NSNumber) {
    canvas.save()
  }
  
  @objc public func toggle(_ node: NSNumber) {
    canvas.toggle()
  }
}


