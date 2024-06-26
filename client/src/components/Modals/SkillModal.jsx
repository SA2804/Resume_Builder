import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

function SkillModal(props) {
    const [skill, setSkill] = useState(null)

    async function handleClick() {
        event.preventDefault()
        let isValid = true
        if (skill == null) {
            document.getElementById('skillMsg').innerText =
                'Kindly Enter your Skill.'
            isValid = false
        }
        if (!isValid) {
            return
        }
        try {
            const data = {
                Id: `${props.Id}`,
                Registration_Id: `${props.Registration_Id}`,
                Skill: skill,
            }
            await axios
                .post('http://localhost:3000/skill', data)
                .then((Response) => {
                    toast(Response.data['text'])
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
                <label htmlFor="skill" className="form-label">
                    Add a Skill:
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="Skill"
                    onChange={(event) => setSkill(event.target.value)}
                />
                <p className=" text-danger fw-bold m-1" id="skillMsg"></p>
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
SkillModal.propTypes = {
    Id: PropTypes.string.isRequired,
    Registration_Id: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    skill: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
}

export default SkillModal
