import React from "react";
import paper from "paper";
import image from "./../images/sculpture1.jpg";

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
    this.sculpture = paper.setup("sculpture");
  }

  loadImage() {
    this.raster = new paper.Raster(image);

    this.rasterLoaded = false;

    this.raster.on("load", () => {
      this.rasterLoaded = true;

      this.onResize();
    });

    this.raster.visible = false;
  }

  onMouseMove(e, geoInst) {
    console.log("moving mouse...");
    // geoInst is the path, rectangle etc
    const component = this;

    if (!component.rasterLoaded) return;
    // if (component.lastPos.getDistance(e.point) < 1) return;

    component.lastPos = e.point;

    let size = geoInst.bounds.size.clone();
    const isLandscape = size.width > size.height;

    if (isLandscape) {
      size.width = size.width / 2;
    } else {
      size.height = size.height / 2;
    }

    const sizeCeil = {
      height: Math.ceil(size.height),
      width: Math.ceil(size.width),
    };

    const sizeFloor = {
      height: Math.floor(size.height),
      width: Math.floor(size.width),
    };

    const moveHandler = function(e) {
      const _this = this; // kill me
      component.onMouseMove(e, _this);
    };

    const path1 = new paper.Path.Rectangle({
      point: geoInst.bounds.topLeft.floor(),
      size: sizeCeil,
      onMouseMove: moveHandler,
    });
    path1.fillColor = component.raster.getAverageColor(path1);

    const path2 = new paper.Path.Rectangle({
      point: isLandscape
        ? geoInst.bounds.topCenter.ceil()
        : geoInst.bounds.leftCenter.ceil(),
      size: sizeFloor,
      onMouseMove: moveHandler,
    });
    path2.fillColor = component.raster.getAverageColor(path2);

    geoInst.remove();
  }

  onResize() {
    if (!this.rasterLoaded) return;

    this.sculpture.project.activeLayer.removeChildren();

    const self = this;
    const moveHandler = function(e) {
      const _this = this; // kill me
      self.onMouseMove(e, _this);
    };

    setTimeout(() => {
      this.raster.fitBounds(self.sculpture.view.bounds, true);

      new paper.Path.Rectangle({
        rectangle: self.sculpture.view.bounds,
        fillColor: self.raster.getAverageColor(self.sculpture.view.bounds),
        onMouseMove: moveHandler,
      });
    });
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
