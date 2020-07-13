import React, { Component } from 'react'

export class FormError extends Component {
    render() {
        const theMessage = this.props.err;
        return (
            <div className="alert col-12 alert-danger px-3">
                {theMessage}
            </div>
        )
    }
}

export default FormError

