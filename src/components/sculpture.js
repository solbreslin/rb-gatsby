import React from "react";
import paper from "paper";
import image from "./../images/sculpture1.jpg";

class Sculpture extends React.Component {
  componentDidMount() {
    this.buildSculpture();
  }

  buildSculpture() {
    var pCanvas = paper.setup("sculpture");
    const raster = new paper.Raster(image);
    let loaded = false;

    raster.on("load", function() {
      loaded = true;
      console.log("Image Loaded");
      onResize();
    });

    // Make the raster invisible:
    raster.visible = false;

    var lastPos = pCanvas.view.center;
    function moveHandler(event) {
      if (!loaded) return;
      if (lastPos.getDistance(event.point) < 10) return;
      lastPos = event.point;

      var size = this.bounds.size.clone();
      var isLandscape = size.width > size.height;

      size /= isLandscape ? [2, 1] : [1, 2];

      var path = new pCanvas.Path.Rectangle({
        point: this.bounds.topLeft.floor(),
        size: 200,
        onMouseMove: moveHandler,
      });
      path.fillColor = raster.getAverageColor(path);

      var path2 = new pCanvas.Path.Rectangle({
        point: isLandscape
          ? this.bounds.topCenter.ceil()
          : this.bounds.leftCenter.ceil(),
        size: size.floor(),
        onMouseMove: moveHandler,
      });
      path2.fillColor = raster.getAverageColor(path);

      this.remove();
    }

    function onResize(event) {
      if (!loaded) return;

      pCanvas.project.activeLayer.removeChildren();
      setTimeout(() => {
        raster.fitBounds(pCanvas.view.bounds, true);

        new paper.Path.Rectangle({
          rectangle: pCanvas.view.bounds,
          fillColor: raster.getAverageColor(pCanvas.view.bounds),
          onMouseMove: moveHandler,
        });
      });
    }
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
