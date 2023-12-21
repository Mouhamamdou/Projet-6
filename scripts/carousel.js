class Carousel {
    // Constructor for the Carousel class
    constructor (element, options = {}) {
        // Store the carousel element and options
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options);

        // Retrieve child elements and initialize current item index
        let children = [].slice.call(element.children)
        this.currentItem = 0

        // Create root and container elements for the carousel
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)

        //Create individual items for each child element 
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })

        // Set initial styles and create navigation buttons
        this.setStyle()
        this.createNavigation()
    }

    // Utility function to create a div with a specified class
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
    
    // Set styles for the carousel container and items
    setStyle () {
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio ) + "%")
    }

    // Create navigation buttons for next and previous slides
    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')

        // Add right and left arrow symbols to the buttons
        nextButton.innerHTML = '<span>&rarr;</span>';
        prevButton.innerHTML = '<span>&larr;</span>';

        // Append navigation buttons to the root element
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)

        // Add event listeners for next and previous button clicks
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }

    // Move to the next set of slides
    next () {
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }

    // Move to the previous set of slides
    prev () {
        this.gotoItem(this.currentItem - this.options.slidesToScroll)
    }

    // Move to a specific item by index
    gotoItem (index) {
        // Handle index adjustments for looping and limits
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >=this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {
            index = 0
        }

        // Calculate the translation and update the container style
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        
        // Update the current item index
        this.currentItem = index
    }
}
