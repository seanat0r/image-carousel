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
	#sequence = [];

	#dotSequence() {
		this.#sequence = [...this.pics];
	}

	#smallBtn() {
		//checks if a dot-container exisiting
		if (this.#dotContainer) {
			this.#dotContainer.innerHTML = "";
		}

		//create a new dot-container
		this.#dotContainer = document.createElement("div");
		this.#dotContainer.id = "dotContainer";
		this.pictureFrame.append(this.#dotContainer);

		//create the dots itself
		for (let i = 0; i < this.#sequence.length; i++) {
			const createDiv = document.createElement("div");

			createDiv.className = "dot";

			createDiv.id = `dot${i}`;
			this.#dotContainer.append(createDiv);
		}
	}
	#getDotPicture(index) {
		return this.#sequence[index];
	}
	dotArrayMove(dotPicture) {
		const dotPicsIndex = this.pics.findIndex((element) => {
			if (dotPicture === element) {
				return true;
			}
		});
		console.log("Index", dotPicsIndex);
		const currentIndexPicture = this.pics.length - 1;
		const stepsToRight =
			(dotPicsIndex - currentIndexPicture + this.pics.length) %
			this.pics.length;
		console.log("HOW MANY STEPS TO RIGHT: ", stepsToRight);

		for (let round = 0; round < stepsToRight; round++) {
			console.log("IN THE FOR-LOOP")
			this.#arrayMoveRight();
		}
		this.#pictureAreMoving();
	}
	dotUpdatetArray(dotPicture) {
		const middlePicture = this.pics[this.pics.length - 1];
		const leftPicture = this.pics[this.pics.length - 2];
		const rightPicture = this.pics[0];

		if (dotPicture === leftPicture) {
			this.#arrayMoveRight();
		} else if (dotPicture === rightPicture) {
			this.#arrayMoveLeft();
		} else if (dotPicture === middlePicture) {
			return console.info("SAME PICTURE");
		} else {
			this.dotArrayMove(dotPicture);
		}
	}
	#colorDot(dot, index) {
		//Color reset
		for(let dotNumber = 0; dotNumber < this.#sequence.length; dotNumber++){
			let dot = document.querySelector(`#dot${dotNumber}`);
			dot.style.backgroundColor =    "rgba(0, 0, 0, 0.4)";
		}
		//aplay color
		dot.style.backgroundColor = "rgba(0, 255, 0, 0.4)";
	}
	#dotClick() {
		const dotClass = document.querySelectorAll(".dot");
		dotClass.forEach((dot, index) => {
			dot.addEventListener("click", () => {
				console.info("Which dot?: ", dot, index);
				const dotPicture = this.#getDotPicture(index);
				this.dotUpdatetArray(dotPicture);

				setTimeout(() => {
					let newDot = document.querySelector(`#dot${index}`);
					this.#colorDot(newDot, index);
				}, 1);
				
			});
		});
	}
	#previewPicture() {
		const leftPosition = this.pics.length - 2;
		const rightPosition = 0;

		const leftPositionPicture = this.pics[leftPosition];
		const rightPositionPicture = this.pics[rightPosition];

		this.leftPicture.append(leftPositionPicture);
		this.rightPicture.append(rightPositionPicture);
	}
	#arrayMoveLeft() {
		const firstElement = this.pics.shift();
		this.pics.push(firstElement);

		this.#pictureAreMoving();
	}
	#arrayMoveRight() {
		const lastElement = this.pics.pop();
		this.pics.unshift(lastElement);

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

		//* dots updated
		this.#smallBtn();

		//* dots eventListener
		this.#dotClick()

		//* Click on left/ Right Picture
		this.#clickOnPreviewPicture();
	}

	#checkElement(element) {
		console.log(
			"element",
			element,
			"and rightPicture: ",
			this.rightPicture.children[0]
		);
		if (element.isSameNode(this.rightPicture.children[0])) {
			return "right";
		} else if (element.isSameNode(this.leftPicture.children[0])) {
			return "left";
		} else {
			console.error("No side detected");
		}
	}
	changeMiddlePicture(side) {
		if (side === "left") {
			return this.pics[this.pics.length - 2];
		} else if (side === "right") {
			return this.pics[0];
		} else {
			console.error("Error: No Side detection!");
		}
	}
	#eventHandelingClickOnPicture(element) {
		const side = this.#checkElement(element);
		const middlePicture = this.changeMiddlePicture(side);

		let leftPictureChild = this.leftPicture.firstChild;
		let rightPictureChild = this.rightPicture.firstChild;

		if (leftPictureChild.src === middlePicture.src && side === "left") {
			console.info("Im in: ", this.pics, "& LEFT SIDE");

			this.#arrayMoveRight();

			this.#clickOnPreviewPicture();
		}
		if (rightPictureChild.src === middlePicture.src && side === "right") {
			console.info("Im in: ", this.pics, "& RIGHT SIDE");

			this.#arrayMoveLeft();

			this.#clickOnPreviewPicture();
		}
	}
	#clickOnPreviewPicture() {
		let leftPictureChild = this.leftPicture.firstChild;
		let rightPictureChild = this.rightPicture.firstChild;

		if (!leftPictureChild && !rightPictureChild) {
			return console.info("Preview doesnt have any picture!");
		}

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
	#changePicture() {
		setInterval(() => {
			this.#arrayMoveLeft();
		}, 5000);
	}
	build() {
		this.#dotSequence();
		this.#smallBtn();
		this.#dotClick();
		this.#previewPicture();
		this.#clickOnPreviewPicture();
		this.#changePicture();
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
