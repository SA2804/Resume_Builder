import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

function EducationModal(props) {
    const [course, setCourse] = useState('')
    const [institution, setInstitution] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleClick = async (event) => {
        event.preventDefault()
        let isValid = true
        if (course == null) {
            document.getElementById('courseMsg').innerText =
                'Kindly Enter your Course.'
            isValid = false
        }
        if (institution == null) {
            document.getElementById('institutionMsg').innerText =
                'Kindly Enter your Institution.'
            isValid = false
        }
        if (startDate == null) {
            document.getElementById('startDateMsg').innerText =
                'Kindly Enter the Start Date.'
            isValid = false
        }
        if (endDate == null) {
            document.getElementById('endDateMsg').innerText =
                'Kindly Enter the End Date.'
            isValid = false
        }
        if (!isValid) {
            return
        }
        try {
            axios
                .post('http://localhost:3000/education', {
                    Id: `${props.Id}`,
                    Registration_Id: `${props.Registration_Id}`,
                    Course: course,
                    Board: institution,
                    startDate: startDate,
                    endDate: endDate,
                })
                .then((Response) => {
                    toast(Response.data.text)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static" // Prevents closing the modal by clicking outside
            keyboard={false} // Prevents closing the modal with the escape key
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className="form-label">{props.course}:</label>
                <input
                    type="text"
                    className="form-control"
                    name={props.course}
                    onChange={(event) => setCourse(event.target.value)}
                />
                <p className="text-danger fw-bold m-1" id="courseMsg"></p>

                <label className="form-label">{props.institution}:</label>
                <input
                    type="text"
                    className="form-control"
                    name={props.institution}
                    required
                    onChange={(event) => setInstitution(event.target.value)}
                />
                <p className="text-danger fw-bold m-1" id="institutionMsg"></p>

                <label className="form-label">{props.startDate}:</label>
                <input
                    type="date"
                    className="form-control"
                    name={props.startDate}
                    required
                    onChange={(event) => setStartDate(event.target.value)}
                />
                <p className="text-danger fw-bold m-1" id="startDateMsg"></p>

                <label className="form-label">{props.endDate}:</label>
                <input
                    type="date"
                    className="form-control"
                    name={props.endDate}
                    required
                    onChange={(event) => setEndDate(event.target.value)}
                />
                <p className="text-danger fw-bold m-1" id="endDateMsg"></p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button type="submit" onClick={handleClick}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

EducationModal.propTypes = {
    Registration_Id: PropTypes.string.isRequired,
    Id: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
}

export default EducationModal
