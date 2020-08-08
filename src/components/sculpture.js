import React from "react";
import paper from "paper";
import image from "./../images/sculpture1.jpg";

const CANVAS_ID = "sculpture";

class Sculpture extends React.Component {
  componentDidMount() {
    this.build();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.onResize.bind(this));
    }
  }

  componentWillUnmount() {
    this.destroy();
  }

  build() {
    this.initCanvas();
    this.loadImage();
    this.lastPos = this.sculpture.view.center;
  }

  initCanvas() {
    this.sculpture = paper.setup(CANVAS_ID);
  }

  loadImage() {
    this.raster = new paper.Raster(image);
    this.rasterLoaded = false;

    this.raster.on("load", () => {
      this.rasterLoaded = true;

      this.onResize();
    });

    // this.raster.position = this.sculpture.view.center;

    // this.raster.visible = false;
  }

  getSizeCeil(size) {
    return {
      height: Math.ceil(size.height),
      width: Math.ceil(size.width),
    };
  }

  getSizeFloor(size) {
    return {
      height: Math.floor(size.height),
      width: Math.floor(size.width),
    };
  }

  onMouseMove(e, geoInst) {
    // geoInst is the path, rectangle etc
    const component = this;

    if (!component.rasterLoaded) return;
    if (component.lastPos.getDistance(e.point) < 20) return;

    component.lastPos = e.point;

    let size = geoInst.bounds.size.clone();
    let isLandscape = size.width > size.height;

    if (isLandscape) {
      size.width /= 2;
    } else {
      size.height /= 2;
    }

    const sizeCeil = component.getSizeCeil(size);
    const sizeFloor = component.getSizeFloor(size);

    const moveHandler = function(e) {
      const _this = this; // kill me
      component.onMouseMove(e, _this);
    };

    const clickHandler = function(e) {
      const _this = this;
      component.drawImage(e, _this);
    };

    const path1 = new paper.Path.Rectangle({
      point: geoInst.bounds.topLeft.floor(),
      size: sizeCeil,
      onMouseMove: moveHandler,
      onClick: clickHandler,
    });
    path1.fillColor = component.raster.getAverageColor(path1);

    const path2 = new paper.Path.Rectangle({
      point: isLandscape
        ? geoInst.bounds.topCenter.ceil()
        : geoInst.bounds.leftCenter.ceil(),
      size: sizeFloor,
      onMouseMove: moveHandler,
      onClick: clickHandler,
    });
    path2.fillColor = component.raster.getAverageColor(path2);

    geoInst.remove();
  }

  onResize() {
    if (!this.rasterLoaded) return;

    // this.sculpture.project.activeLayer.removeChildren();

    const self = this;
    const moveHandler = function(e) {
      const _this = this; // kill me
      self.onMouseMove(e, _this);
    };

    const clickHandler = function(e) {
      const _this = this; // kill me
      self.drawImage(e, _this);
    };

    setTimeout(() => {
      this.raster.fitBounds(self.sculpture.view.bounds, true);
      new paper.Path.Rectangle({
        rectangle: self.sculpture.view.bounds,
        fillColor: self.raster.getAverageColor(self.sculpture.view.bounds),
        onClick: clickHandler,
        onMouseMove: moveHandler,
      });
    });
  }

  drawImage(e, geoInst) {
    // geoInst is the path, rectangle etc
    const component = this;

    let size = geoInst.bounds.size.clone();
    let position = geoInst.position;

    const startX = position._x;
    const startY = position._y - component.raster.bounds._y;
    const endX = startX + size.width;
    const endY = startY + size.height;

    const rect = new paper.Rectangle({
      from: [startX, startY],
      to: [endX, endY],
    });

    const subraster = component.raster.getSubRaster(rect);
    subraster.bringToFront();
  }

  destroy() {
    this.sculpture.project.activeLayer.removeChildren();
  }

  render() {
    return (
      <div className="sculpture-wrapper">
        <canvas resize="true" id="sculpture"></canvas>
      </div>
    );
  }
}

export default Sculpture;
