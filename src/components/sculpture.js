import React from "react";
import paper from "paper";
import image from "./../images/sculpture1.jpg";

const CANVAS_ID = "sculpture";

class Sculpture extends React.Component {
  componentDidMount() {
    this.build();

    // if (typeof window !== "undefined") {
    //   window.addEventListener("resize", this.onResize.bind(this));
    // }
  }

  componentWillUnmount() {
    this.destroy();
  }

  build() {
    const c = paper.setup(CANVAS_ID);
    const raster = new paper.Raster(image);
    let rasterLoaded = false;
    let lastPos = c.view.center;

    raster.on("load", () => {
      rasterLoaded = true;
      raster.fitBounds(c.view.bounds, true);
      onResize();
    });

    // this.raster.visible = false;

    const moveHandler = function(e) {
      if (!rasterLoaded) return;
      if (lastPos.getDistance(e.point) < 20) return;

      lastPos = e.point;

      let size = this.bounds.size.clone();
      let isLandscape = size.width > size.height;

      if (isLandscape) {
        size.width /= 2;
      } else {
        size.height /= 2;
      }

      const sizeCeil = {
        height: Math.ceil(size.height),
        width: Math.ceil(size.width),
      };

      const sizeFloor = {
        height: Math.floor(size.height),
        width: Math.floor(size.width),
      };

      const path1 = new paper.Path.Rectangle({
        point: this.bounds.topLeft.floor(),
        size: sizeCeil,
        onMouseMove: moveHandler,
      });
      path1.fillColor = raster.getAverageColor(path1);

      const path2 = new paper.Path.Rectangle({
        point: isLandscape
          ? this.bounds.topCenter.ceil()
          : this.bounds.leftCenter.ceil(),
        size: sizeFloor,
        onMouseMove: moveHandler,
      });
      path2.fillColor = raster.getAverageColor(path2);

      this.remove();
    };

    const onResize = function(e) {
      if (!rasterLoaded) return;
      c.project.activeLayer.removeChildren();

      setTimeout(() => {
        raster.fitBounds(c.view.bounds, true);
        new paper.Path.Rectangle({
          rectangle: c.view.bounds,
          fillColor: raster.getAverageColor(c.view.bounds),
          onMouseMove: moveHandler,
        });
      });
    };
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
