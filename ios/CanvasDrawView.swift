//
//  CanvasDrawView.swift
//  Toddle
//
//  Created by Raj Jakasaniya on 08/07/20.
//

import Foundation
private struct Line {
  var startPoint:CGPoint
  var endPoint:CGPoint
  var stroke: Int
  var color: String
}

@objc(CanvasDrawView)
class CanvasDrawView: UIView {
  //Exportable Properties
  @objc var strokeColor: String = "#000000"
  @objc var strokeWidth: NSNumber = 3
  @objc var drawImagePath: String = ""
  @objc var onSaved: RCTDirectEventBlock?
  @objc var onError: RCTDirectEventBlock?
  
  //Properties
  private var lines = [[Line]]()
  private var linesUndone = [[Line]]()
  private var pathsUndone = [CAShapeLayer]()
  private var isErase = false
  private var lastPoint:CGPoint!
  var drawImageView = UIImageView(image: UIImage(named: "himalayas"))
  var erase = false
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    var image: UIImage?
    if let url = URL(string: drawImagePath.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed) ?? "")  {
      image = try? UIImage(data: Data(contentsOf: url))
    } else {
      image = UIImage(named: "himalayas")
    }
    
    //    drawImageView.frame = self.frame
    drawImageView.image = image
    setup()
  }
  
  init(image: UIImage?, frame: CGRect) {
    super.init(frame: frame)
    drawImageView.image = image
    setup()
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
  }
  
  private func setup() {
    self.addSubview(drawImageView)
    drawImageView.backgroundColor = UIColor.red
    drawImageView.translatesAutoresizingMaskIntoConstraints = false
    NSLayoutConstraint(item: drawImageView, attribute: .top, relatedBy: .equal, toItem: self, attribute: .top, multiplier: 1, constant: 0).isActive = true
    NSLayoutConstraint(item: drawImageView, attribute: .bottom, relatedBy: .equal, toItem: self, attribute: .bottom, multiplier: 1, constant: 0).isActive = true
    NSLayoutConstraint(item: drawImageView, attribute: .leading, relatedBy: .equal, toItem: self, attribute: .leading, multiplier: 1, constant: 0).isActive = true
    NSLayoutConstraint(item: drawImageView, attribute: .trailing, relatedBy: .equal, toItem: self, attribute: .trailing, multiplier: 1, constant: 0).isActive = true
  }
  
  override func draw(_ rect: CGRect) {
    super.draw(rect)
  }
  
  private func draw(with layer: CAShapeLayer) {
    let path = CGMutablePath()
    if let line = lines.last {
      for point in line {
        path.move(to: point.startPoint)
        path.addLine(to: point.endPoint)
        layer.lineWidth = CGFloat(exactly: point.stroke) ?? 0
        layer.strokeColor = hexToColor(point.color).cgColor
      }
      layer.frame = drawImageView.frame
      layer.path = path
      setNeedsDisplay()
    }
  }
  
  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    lastPoint = touches.first?.location(in: self)
    if !erase {
      lines.append([Line]())
      linesUndone.removeAll()
      pathsUndone.removeAll()
      let drawingLayer = CAShapeLayer()
      drawImageView.layer.addSublayer(drawingLayer)
    }
  }
  
  override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
    guard (touches.first?.location(in: nil)) != nil else {
      return
    }
    if let touch  = touches.first {
      guard var lastLine = lines.popLast()  else {
        return
      }
      let newPoint = touch.location(in:self)
      if erase {
        erase(point: newPoint)
      } else {
        lastLine.append(Line(startPoint: lastPoint, endPoint: newPoint, stroke: Int(strokeWidth), color: strokeColor))
        lastPoint = newPoint
        lines.append(lastLine)
      }
      draw(with: drawImageView.layer.sublayers?.last as! CAShapeLayer)
    }
  }
  
  private func hexToColor(_ hexString: String) -> UIColor {
    let hexString: String = hexString.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
    let scanner = Scanner(string: hexString)
    if (hexString.hasPrefix("#")) {
      scanner.scanLocation = 1
    }
    var color: UInt32 = 0
    scanner.scanHexInt32(&color)
    let mask = 0x000000FF
    let r = Int(color >> 16) & mask
    let g = Int(color >> 8) & mask
    let b = Int(color) & mask
    let red   = CGFloat(r) / 255.0
    let green = CGFloat(g) / 255.0
    let blue  = CGFloat(b) / 255.0
    return UIColor(red:red, green:green, blue:blue, alpha:1)
  }
  
  @objc func undo() {
    DispatchQueue.main.async {
      guard self.drawImageView.layer.sublayers?.count ?? 0 > 0, let layer = self.drawImageView.layer.sublayers?.last as? CAShapeLayer else { return }
      self.linesUndone.append(self.lines.removeLast())
      self.pathsUndone.append(layer)
      self.drawImageView.layer.sublayers?.removeLast()
      self.setNeedsDisplay()
    }
  }
  
  @objc func redo() {
    DispatchQueue.main.async {
      guard self.pathsUndone.count > 0 else {return}
      self.drawImageView.layer.addSublayer(self.pathsUndone.removeLast())
      self.lines.append(self.linesUndone.removeLast())
      self.setNeedsDisplay()
    }
  }
  
  @objc func clearCanvas() {
    DispatchQueue.main.async {
      while self.drawImageView.layer.sublayers?.count ?? 0 > 0, self.drawImageView.layer.sublayers?.last is CAShapeLayer {
        self.drawImageView.layer.sublayers?.removeLast()
      }
      self.lines.removeAll()
      self.pathsUndone.removeAll()
      self.linesUndone.removeAll()
      self.setNeedsDisplay()
    }
  }
  
  @objc func erase(point: CGPoint) {
    DispatchQueue.main.async {
      for line in self.lines {
        
      }
      
    }
  }
  func toggle() {
    //    self.erase = erase
  }
  @objc func save() {
    DispatchQueue.main.async {
      UIGraphicsBeginImageContext(self.drawImageView.bounds.size)
      self.drawImageView.layer.render(in: UIGraphicsGetCurrentContext()!)
      let image = UIGraphicsGetImageFromCurrentImageContext()
      UIGraphicsEndImageContext()
      guard let editedImage = image else {
        if let onError = self.onError {
          onError(["message": "No Image available to save"])
        }
        return
      }
      self.writeToPhotoAlbum(image: editedImage)
    }
  }
}


extension CanvasDrawView {
  func writeToPhotoAlbum(image: UIImage) {
    UIImageWriteToSavedPhotosAlbum(image, self, #selector(saveError), nil)
  }
  
  @objc func saveError(_ image: UIImage, didFinishSavingWithError error: Error?, contextInfo: UnsafeRawPointer) {
    guard let error = error else {
      if let onError = self.onError {
        onError(["message": "Error Saving image to the documents folder"])
      }
      return
    }
    if let onSaved = self.onSaved {
      print(onSaved)
      onSaved([:])
    }
  }
}
