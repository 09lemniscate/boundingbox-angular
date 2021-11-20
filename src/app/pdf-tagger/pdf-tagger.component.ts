import { Component, Input, OnInit } from "@angular/core";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

@Component({
  selector: "app-pdf-tagger",
  templateUrl: "./pdf-tagger.component.html",
  styleUrls: ["./pdf-tagger.component.scss"],
})
export class PdfTaggerComponent implements OnInit {
  public src = "/assets/Document.pdf";
  private context: CanvasRenderingContext2D;
  isMoving: boolean;
  public imgWidth: number;
  public uniX: number;
  public uniY: number;
  public uniX2: number;
  public uniY2: number;
  public initX: number;
  public initY: number;
  public imgHeight: number;
  public url: string;
  public image = null;
  drawItems = [];
  @Input("ImageHeight") ImageHeight = 300;
  @Input("ImageWidth") ImageWidth = 300;
  constructor() {}

  ngOnInit() {}
  showPdf(pdfData?) {
    var pdfjsLib = window["pdfjs-dist/build/pdf"];
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "//mozilla.github.io/pdf.js/build/pdf.worker.js";
    this.image = pdfData;
    var loadingTask = pdfjsLib.getDocument(pdfData);
    let parent = this;

    loadingTask.promise.then(
      function (pdf) {
        console.log("this file has " + pdf._pdfInfo.numPages + "pages");
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {
          console.log("Page loaded");
          var scale = 1;
          var viewport = page.getViewport({ scale: scale });
          // Prepare canvas using PDF page dimensions
          var canvas = <HTMLCanvasElement>document.getElementById("the-canvas");
          var context = canvas.getContext("2d");
          parent.context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function (e) {
            console.log(e);
            canvas = <HTMLCanvasElement>document.getElementById("the-canvas");
            canvas.addEventListener("mousedown", (e) => {
              parent.isMoving = true;
              parent.initX = e.offsetX;
              parent.initY = e.offsetY;
            });
            canvas.addEventListener("mouseup", (e) => {
              parent.isMoving = false;
              parent.drawItems.push({
                name: "",
                x0: parent.initX,
                y0: parent.initY,
                x1: parent.uniX,
                y1: parent.uniY,
              });
              parent.drawRect(
                "red",
                e.offsetX - parent.initX,
                e.offsetY - parent.initY,
                0
              );
              parent.uniX = undefined;
              parent.uniY = undefined;
            });

            canvas.addEventListener("mousemove", (e) => {
              if (parent.isMoving) {
                parent.drawRect(
                  "red",
                  e.offsetX - parent.initX,
                  e.offsetY - parent.initY,
                  0
                );
              }
            });
            console.log("Page rendered");
          });
        });
      },
      function (reason) {
        // PDF loading error
        console.error(reason);
      }
    );
  }
  drawRect(color = "black", height, width, flag) {
    console.log(this.context);
    this.uniX = height;
    this.uniY = width;
    this.uniX2 = height;
    this.uniY2 = width;
    for (var i = 0; i < this.drawItems.length; i++) {
      this.context.beginPath();
      this.context.rect(
        this.drawItems[i].x0,
        this.drawItems[i].y0,
        this.drawItems[i].x1,
        this.drawItems[i].y1
      );
      this.context.lineWidth = 3;
      this.context.strokeStyle = color;
      this.context.stroke();
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (fileLoadedEvent) => {
        let base64 = fileLoadedEvent.target.result;
        let pdfAsArray = convertDataURIToBinary(base64);
        this.showPdf(pdfAsArray);
      };
    }
    function convertDataURIToBinary(dataURI) {
      let BASE64_MARKER = ";base64,";
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));

      for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }
  }
}
