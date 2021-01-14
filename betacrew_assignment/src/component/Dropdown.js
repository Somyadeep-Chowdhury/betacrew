import React, { Component } from 'react'
import axios from 'axios'
import a from '../assets/elephant.jpg'
import b from '../assets/Victoria.jpg'
import '../style/dropdown.css'

const url = 'http://localhost:1337'
export default class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgArr: [
                { "name": "Elephant", "imgsrc": a, "value": "elephant" },
                { "name": "Victoria", "imgsrc": b, "value": "victoria" },
            ],
            input: "",
            img: "",
        }
        this.removeAllInput()
    }

    fetchPosts = (name) => {
        axios.get(url + '/api/v1/posts')
            .then((response) => {
                if (response.status === 200) {
                    let a = response.data.data.filter(el => el.name === name)
                    this.setState({ co_ordinates: a })
                    this.showBox(a)
                }
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.input !== prevState.input) {
            this.removeAllInput()
            this.fetchPosts(this.state.input)
        }
    }

    removeAllInput() {
        let doc = document.getElementsByTagName('input')
        while (doc.length > 0) { doc[0].remove() }
    }

    mouseEnter = (e) => {
        console.log(e)
        let cor = { x: e.clientX, y: e.clientY, message: "", name: this.state.input }
        this.showBox([cor])
    }

    showBox = (e) => {
        for (let i = 0; i < e.length; i++) {
            var box = document.createElement('input');
            box.setAttribute('type', 'text')
            box.className = "_box";
            box.style.left = e[i].x + 'px';
            box.style.top = e[i].y + 'px';
            box.setAttribute('value', e[i].message)
            document.body.append(box);
            box.onkeyup = function (ev) {
                if (ev.key === 'Enter') {
                    axios.post(url + '/api/v1/posts', { "x": e[i].x, "y": e[i].y, "message": this.value, "name": document.getElementById('items').value })
                        .then((response) => {
                            if (response.status === 201) {
                                alert('Done')
                            }
                        })
                }
            }
        }
    }
    render() {
        return (
            <div className='main-drop'>
                <h1>Assignment</h1>
                <div>
                    <label htmlFor="items">Choose an item:</label>
                    <select id="items" defaultValue="Choose an Item" onChange={(e) => {
                        this.setState({
                            input: e.target.value,
                            img: this.state.imgArr.filter(a => a.value === e.target.value).map(t => t.imgsrc)
                        });
                    }}>
                        <option value="Choose an Item" disabled>Choose an Item</option>
                        {this.state.imgArr && this.state.imgArr.length > 0 && this.state.imgArr.map((el) => (
                            <option key={el.name} value={el.value}>{el.name}</option>
                        ))}
                    </select>
                </div>
                <hr />

                <img src={this.state.img} alt={this.state.name} className='img_tag' onClick={(e) => this.mouseEnter(e)} />
            </div>
        )
    }
}
