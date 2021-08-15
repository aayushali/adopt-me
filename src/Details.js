import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import Modal from './modal';
class Details extends Component {

    state = { loading: true, showModal: false };


    async componentDidMount() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
        );

        const json = await res.json();
        this.setState(
            {
                loading: false,
                name: json.pets[0].name,
                breed: json.pets[0].breed,
                animal: json.pets[0].animal,
                description: json.pets[0].description,
                city: json.pets[0].city,
                state: json.pets[0].state,
                images: json.pets[0].images

            });
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal });
    adopt = () => (window.location = "http://bit.ly/pet-adopt");

    render() {

        if (this.state.loading) {
            return <h2>loading...</h2>
        }


        const { animal, breed, city, state, description, name, images, showModal } = this.state;


        return (
            <div className="details">
                <Carousel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>{animal} - {breed} - {city} , {state}</h2>
                    <button onClick={this.toggleModal}> Adopt {name} </button>
                    <p>{description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {name}?</h1>
                                    <div className="buttons">
                                        <button onClick={this.adopt}>Yes</button>
                                        <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null

                    }
                </div>
            </div>
        )
    }
}



const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
    return (
        <ErrorBoundary>
            <DetailsWithRouter />
        </ErrorBoundary>
    )
}