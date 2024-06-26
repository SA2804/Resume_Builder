import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

function HomePage() {
    const location = useLocation()
    const { resumeID } = location.state || {}
    const [personalData, setPersonalData] = useState([])
    const [expData, setExpData] = useState([])
    const [eduData, setEduData] = useState([])
    const [skillData, setSkillData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const registrationId = localStorage.getItem('registrationId')
        const fetchData = async () => {
            try {
                const [
                    personalResponse,
                    expResponse,
                    eduResponse,
                    skillResponse,
                ] = await Promise.all([
                    axios.get(`http://localhost:3000/personalInfo/`),
                    axios.get(`http://localhost:3000/experience/`),
                    axios.get(`http://localhost:3000/education/`),
                    axios.get(`http://localhost:3000/skill/`),
                ])
                setPersonalData(
                    personalResponse.data.filter(
                        (data) => data.registration_id === registrationId
                    )
                )
                setExpData(
                    expResponse.data.filter(
                        (data) => data.registration_id === registrationId
                    )
                )
                setEduData(
                    eduResponse.data.filter(
                        (data) => data.registration_id === registrationId
                    )
                )
                setSkillData(
                    skillResponse.data.filter(
                        (data) => data.registration_id === registrationId
                    )
                )
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
        // Cleanup function to clear the state when navigating away
        return () => {
            setPersonalData([])
            setExpData([])
            setEduData([])
            setSkillData([])
        }
    }, [resumeID])
    const handleAdd = () => {
        const resID = Math.floor(100000 + Math.random() * 900000).toString()
        navigate('/createResume', { state: { resumeID: resID } })
    }
    const handleClick = (index) => {
        console.log(index)
        const selectedResumeID = personalData[index].resume_id
        // Filter out arrays...
        const filteredPersonalData = personalData.filter(
            (data) => data.resume_id === selectedResumeID
        )
        const filteredExpData = expData.filter(
            (data) => data.resume_id === selectedResumeID
        )
        const filteredEduData = eduData.filter(
            (data) => data.resume_id === selectedResumeID
        )
        const filteredSkillData = skillData.filter(
            (data) => data.resume_id === selectedResumeID
        )
        navigate('/myResume', {
            state: {
                personalInfo: filteredPersonalData,
                expInfo: filteredExpData,
                eduInfo: filteredEduData,
                skillInfo: filteredSkillData,
            },
        })
    }
    const handleDelete = async (index) => {
        const resumeId = personalData[index].resume_id
        try {
            await Promise.all([
                axios.delete(`http://localhost:3000/personalData/${resumeId}`),
                axios.delete(
                    `http://localhost:3000/experienceData/${resumeId}`
                ),
                axios.delete(`http://localhost:3000/educationData/${resumeId}`),
                axios.delete(`http://localhost:3000/skillData/${resumeId}`),
            ]).then(
                toast('Resume Deleted Successfully.Kindly refresh the page.')
            )
        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = async (index) => {
        const selectedResumeID = personalData[index].resume_id
        console.log('selectedResumeID:', selectedResumeID) // Add this line for debugging
        const filteredPersonalData = personalData.filter(
            (data) => data.resume_id === selectedResumeID
        )
        const filteredExpData = expData.filter(
            (data) => data.resume_id === selectedResumeID
        )
        const filteredEduData = eduData.filter(
            (data) => data.resume_id === selectedResumeID
        )
        const filteredSkillData = skillData.filter(
            (data) => data.resume_id === selectedResumeID
        )
        navigate('/editResume', {
            state: {
                ID: selectedResumeID,
                personalInfo: filteredPersonalData,
                expInfo: filteredExpData,
                eduInfo: filteredEduData,
                skillInfo: filteredSkillData,
            },
        })
    }
    return (
        <>
            <div className="container">
                <div
                    className="bg-white rounded shadow p-2 mt-4"
                    style={{ minHeight: '80vh' }}
                >
                    <div className="d-flex justify-content-between border-bottom p-3">
                        <h5>
                            <b>Your Resumes</b>
                        </h5>
                        <div>
                            <button
                                onClick={handleAdd}
                                className="text-decoration-none"
                            >
                                <i className="bi bi-file-earmark-plus">Add</i>
                            </button>
                        </div>
                    </div>
                    {personalData.length === 0 ? (
                        <div
                            className="text-center py-3 border rounded mt-3"
                            style={{ backgroundColor: '#ECECEC' }}
                        >
                            <i className="bi bi-file-text">
                                {' '}
                                No Resumes Available
                            </i>
                        </div>
                    ) : (
                        personalData.map((element, index) => (
                            <div key={index} className="d-flex flex-wrap">
                                <div className="col-12 col-md-6 p-2">
                                    <div className="p-2 border rounded">
                                        <h5>{element.title}</h5>
                                        <div className="d-flex gap-2 mt-1">
                                            {' '}
                                            {/*Use closure below to target index. */}
                                            <button
                                                className="text-decoration-none small"
                                                onClick={() =>
                                                    handleClick(index)
                                                }
                                            >
                                                <i className="bi bi-file-text"></i>{' '}
                                                Open
                                            </button>
                                            <button
                                                className="text-decoration-none small"
                                                onClick={() =>
                                                    handleEdit(index)
                                                }
                                            >
                                                <i className="bi bi-pencil-square"></i>{' '}
                                                Edit
                                            </button>
                                            <button
                                                className="text-decoration-none small"
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                            >
                                                <i className="bi bi-trash2"></i>{' '}
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
export default HomePage
