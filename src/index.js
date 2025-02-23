// Importing CSS
import "./styles/style.css";

class Carousel {
	constructor(
		pics,
		carousel,
		thumbnails,
		pictureFrame,
		left,
		right,
		mainImage,
		lPicture,
		rPicture
	) {
		this.pics = Array.from(pics);
		this.carousel = carousel;
		this.thumbnails = thumbnails;
		this.pictureFrame = pictureFrame;
		this.leftBtn = left;
		this.rightBtn = right;
		this.mainImage = mainImage;
		this.leftPicture = lPicture;
		this.rightPicture = rPicture;
	}
	#dotContainer = null;

	#smallBtn() {
		if (!this.#dotContainer) {
			this.#dotContainer = document.createElement("div");
			this.#dotContainer.id = "dotContainer";
			this.pictureFrame.append(this.#dotContainer);
		} else {
			this.#dotContainer.innerHTML = "";
		}

		for (let i = 0; i < this.pics.length; i++) {
			console.log(i);
			const createDiv = document.createElement("div");

			createDiv.className = "dot";

			createDiv.id = `dot${i}`;
			this.#dotContainer.append(createDiv);
		}
	}
	#previewPicture() {
		console.log(this.pics);
		const leftPosition = this.pics.length - 2;
		const rightPosition = 0;

		console.log(leftPosition, rightPosition);
		console.log(this.pics);

		const leftPositionPicture = this.pics[leftPosition];
		const rightPositionPicture = this.pics[rightPosition];

		this.leftPicture.append(leftPositionPicture);
		this.rightPicture.append(rightPositionPicture);
	}
	#arrayMoveLeft() {
		console.info("before: ", this.pics);

		const firstElement = this.pics.shift();
		this.pics.push(firstElement);

		console.info("after: ", this.pics);

		this.#pictureAreMoving();
	}
	#arrayMoveRight() {
		console.info("before: ", this.pics);

		const lastElement = this.pics.pop();
		this.pics.unshift(lastElement);

		console.info("after: ", this.pics);

		this.#pictureAreMoving();
	}
	#pictureAreMoving() {
		//* mid
		this.pictureFrame.innerHTML = "";
		this.pictureFrame.append(this.pics[this.pics.length - 1]);

		//* right
		this.rightPicture.innerHTML = "";
		this.rightPicture.append(this.pics[0]);

		//* left
		this.leftPicture.innerHTML = "";
		this.leftPicture.append(this.pics[this.pics.length - 2]);

		//* void
		this.thumbnails.innerHTML = "";
		this.thumbnails.append(this.pics[1]);
	}
	//! DA WEITER MACHEN
	//TODO: SEITE ERKENNEN UND RICHTIGE RICHTUNG BEWEGEN!
	#checkElement(element) {
		console.log("element", element);
		if (element === this.rightPicture.children) {
			console.log("clicked right side");
			return "right";
		} else if (element === this.leftPicture.children) {
			console.log("clicked left side");
			return "left";
		} else {
			console.error("No side detected");
		}
	}
	#eventHandelingClickOnPicture(element) {
		const side = this.#checkElement(element);
		let leftPictureChild = this.leftPicture.firstChild;
		let rightPictureChild = this.rightPicture.firstChild;

		console.log("got clicked");

		const middlePicture = this.pics[this.pics.length - 2];

		console.log(middlePicture, " , ", leftPictureChild);
		console.log("sameElement: ", middlePicture, "pics", this.pics);

		if (leftPictureChild.src === middlePicture.src) {
			console.log("Im in: ", this.pics);

			this.#arrayMoveRight();

			this.#clickOnPreviewPicture();
		}
	}
	#clickOnPreviewPicture() {
		let leftPictureChild = this.leftPicture.firstChild;
		let rightPictureChild = this.rightPicture.firstChild;

		console.log(leftPictureChild, rightPictureChild);

		if (!leftPictureChild && !rightPictureChild) {
			return console.info("Preview doesnt have any picture!");
		}
		console.info("before any manipulation, pic: ", this.pics);
		leftPictureChild.replaceWith(leftPictureChild.cloneNode(true));
		leftPictureChild = this.leftPicture.firstChild;
		leftPictureChild.addEventListener("click", (event) => {
			this.#eventHandelingClickOnPicture(event.target);
		});

		rightPictureChild.replaceWith(rightPictureChild.cloneNode(true));
		rightPictureChild = this.rightPicture.firstChild;
		rightPictureChild.addEventListener("click", (event) => {
			this.#eventHandelingClickOnPicture(event.target);
		});
	}
	build() {
		this.#smallBtn();
		this.#previewPicture();
		this.#clickOnPreviewPicture();
	}
}

const thumbnailsClass = document.querySelectorAll(".thumbnail");
const carouselId = document.querySelector("#carousel");
const thumbnailsId = document.querySelector("#thumbnails");
const pictureFrameId = document.querySelector("#pictureFrame");
const leftId = document.querySelector("#left");
const rightId = document.querySelector("#right");
const mainImageId = document.querySelector("#mainImage");
const lPicture = document.querySelector("#leftPicture");
const rPicture = document.querySelector("#rightPicture");

const carousel = new Carousel(
	thumbnailsClass,
	carouselId,
	thumbnailsId,
	pictureFrameId,
	leftId,
	rightId,
	mainImageId,
	lPicture,
	rPicture
);

carousel.build();
