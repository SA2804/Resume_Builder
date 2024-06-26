import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ExperienceModal(props) {
    const [position, setPosition] = useState(null)
    const [company, setCompany] = useState(null)
    const [desc, setDesc] = useState(null)
    const onAddExperience = props.onAddExperience

    async function handleClick() {
        let isValid = true
        if (position == null) {
            document.getElementById('positionMsg').innerText =
                'Kindly Enter your Position.'
            isValid = false
        }
        if (company == null) {
            document.getElementById('companyMsg').innerText =
                'Kindly Enter your Company.'
            isValid = false
        }
        if (desc == null) {
            document.getElementById('descMsg').innerText =
                'Kindly Enter your Job Description.'
            isValid = false
        }
        if (document.getElementById('startDate').value == '') {
            isValid = false
            console.log('noStart')
            document.getElementById('startDateMsg').innerText =
                'Kindly Enter the Start Date'
        }
        if (document.getElementById('endDate').value == '') {
            isValid = false
            console.log('no end ')
            document.getElementById('endDateMsg').innerText =
                'Kindly Enter the End Date'
        }
        if (!isValid) {
            return
        }
        try {
            const data = {
                Registration_Id: `${props.Registration_Id}`,
                Id: `${props.Id}`,
                Position: position,
                Company: company,
                Description: desc,
                Start: document.getElementById('startDate').value,
                End: document.getElementById('endDate').value,
            }
            await axios
                .post('http://localhost:3000/experience', data)
                .then((Response) => {
                    toast(Response.data.text)
                    onAddExperience(data)
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
                <label className="form-label">{props.position}:</label>
                <input
                    type="text"
                    className="form-control"
                    name={props.position}
                    onChange={(event) => setPosition(event.target.value)}
                />
                <p className=" text-danger fw-bold m-1" id="positionMsg"></p>

                <label className="form-label">{props.company}:</label>
                <input
                    type="text"
                    className="form-control"
                    name={props.company}
                    required
                    onChange={(event) => setCompany(event.target.value)}
                />
                <p className=" text-danger fw-bold m-1" id="companyMsg"></p>
                <label className="form-label">{props.startDate}:</label>
                <input
                    type="date"
                    className="form-control"
                    name={props.startDate}
                    required
                    id="startDate"
                />
                <p className=" text-danger fw-bold m-1" id="startDateMsg"></p>
                <label className="form-label">{props.endDate}:</label>
                <input
                    type="date"
                    className="form-control"
                    name={props.endDate}
                    id="endDate"
                    required
                />
                <p className=" text-danger fw-bold m-1" id="endDateMsg"></p>
                <label className="form-label">{props.jobDesc}:</label>
                <input
                    type="text"
                    className="form-control"
                    name={props.jobDesc}
                    onChange={(event) => setDesc(event.target.value)}
                />
                <p className=" text-danger fw-bold m-1" id="descMsg"></p>
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
ExperienceModal.propTypes = {
    Registration_Id: PropTypes.string.isRequired,
    Id: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    jobDesc: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    onAddExperience: PropTypes.func.isRequired,
}

export default ExperienceModal
