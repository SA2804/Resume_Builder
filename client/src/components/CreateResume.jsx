import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ExperienceModal from './Modals/ExperienceModal'
import axios from 'axios'
import EducationModal from './Modals/EducationModal'
import SkillModal from './Modals/SkillModal'
import { toast } from 'react-toastify'

function CreateResume() {
    const location = useLocation()
    const { resumeID } = location.state || {}
    const registrationId = localStorage.getItem('registrationId')
    const [modal1Show, setModal1Show] = useState(false)
    const [modal2Show, setModal2Show] = useState(false)
    const [modal3Show, setModal3Show] = useState(false)
    let [resumeTitle, setResumeTitle] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [mobileNo, setMobileNo] = useState(1111111111)
    const [dOB, setDOB] = useState(null)
    const [hobbies, setHobbies] = useState('NA')
    const [lang, setLang] = useState('English')
    const [address, setAddress] = useState(null)
    const [gender, setGender] = useState('Male')
    const [religion, setReligion] = useState('None')
    const [nationality, setNationality] = useState('Indian')
    const [maritalStatus, setMaritalStatus] = useState('Single')
    const [experienceData, setExperienceData] = useState([])
    const [educationData, setEducationData] = useState([])
    const [skillData, setSkillData] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        console.log(resumeID)
        const getExpData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/experience/`
                )
                const filteredExpData = response.data.filter(
                    (data) => data.resumeID === resumeID
                )
                setExperienceData(filteredExpData)
            } catch (error) {
                console.log(error)
            }
        }
        const getEduData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/education/`
                )
                const filteredEduData = response.data.filter(
                    (data) => data.resumeID === resumeID
                )
                setEducationData(filteredEduData)
            } catch (error) {
                console.log(error)
            }
        }
        const getSkillData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/skill/`)
                const filteredSkillData = response.data.filter(
                    (data) => data.resumeID === resumeID
                )
                setSkillData(filteredSkillData)
            } catch (error) {
                console.log(error)
            }
        }
        getExpData()
        getEduData()
        getSkillData()
    }, [resumeID])

    const handleSubmit = async (event) => {
        event.preventDefault()
        let isValid = true

        // Name Validation:

        let re1 = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
        if (name === null) {
            document.getElementById('nameMsg').innerText = 'Enter your name.'
            isValid = false
        } else if (!re1.test(name)) {
            document.getElementById('nameMsg').innerText =
                'Enter a proper name.'
            isValid = false
        } else {
            document.getElementById('nameMsg').innerText = ''
        }

        // Email Validation:

        let re2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!re2.test(email)) {
            document.getElementById('emailMsg').innerText =
                'Enter a proper email.'
            isValid = false
        } else {
            document.getElementById('emailMsg').innerText = ''
        }
        if (address == null) {
            document.getElementById('addressMsg').innerText =
                'Enter your Address.'
            isValid = false
        } else {
            document.getElementById('addressMsg').innerText = ''
        }
        if (!isValid) {
            return
        }
        //  Post personal details into dB.
        try {
            if (resumeTitle == null) {
                resumeTitle = `Resume ${resumeID}`
            }
            const data = {
                Id: resumeID,
                Title: resumeTitle,
                Name: name,
                Email: email,
                Mobile: mobileNo,
                DOB: dOB,
                Gender: gender,
                Religion: religion,
                Nationality: nationality,
                Marital_Status: maritalStatus,
                Hobbies: hobbies,
                Languages: lang,
                Address: address,
                Registration_Id: registrationId,
            }
            axios
                .post('http://localhost:3000/personalInfo', data)
                .then((Response) => {
                    toast(Response.data)
                    navigate('/homePage', { state: { resumeID } })
                })
        } catch (error) {
            console.log(error)
        }
    }
    function handleDate() {
        document.getElementById('dateMsg').innerText =
            'Kindly select a date which is on or before 31st December,2006.'
        setTimeout(
            () => (document.getElementById('dateMsg').innerText = ''),
            5000
        )
    }
    const handleAddExperience = (newExperience) => {
        setExperienceData((prevData) => [...prevData, newExperience])
    }

    return (
        <>
            <div className="container">
                <div
                    className="bg-white rounded shadow-lg p-3 mt-4 mb-4"
                    style={{ minHeight: '80vh' }}
                >
                    <div className="d-flex justify-content-between border-bottom">
                        <h5>Create Resume</h5>
                        <div>
                            <a
                                href="/homePage"
                                className="text-decoration-none"
                            >
                                <i className="bi bi-arrow-left-circle"> Back</i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <form className="row g-3 p-3" onSubmit={handleSubmit}>
                            <h5 className="mt-3 text-primary">
                                <i className="bi bi-feather"> Resume Title</i>
                            </h5>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    placeholder="Enter a name for this Resume.  "
                                    className="form-control"
                                    onChange={(event) =>
                                        setResumeTitle(event.target.value)
                                    }
                                />
                            </div>
                            <h5 className="mt-3 text-primary">
                                <i className="bi bi-person-badge">
                                    {' '}
                                    Personal Information
                                </i>
                            </h5>

                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your Name "
                                    className="form-control"
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                />
                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="nameMsg"
                                ></p>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="xyz@abc.com"
                                    className="form-control"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />

                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="emailMsg"
                                ></p>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="number" className="form-label">
                                    Mobile No
                                </label>
                                <input
                                    type="number"
                                    min="1111111111"
                                    placeholder="Enter your phone number"
                                    max="9999999999"
                                    required
                                    className="form-control"
                                    onChange={(event) =>
                                        setMobileNo(event.target.value)
                                    }
                                />

                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="numberMsg"
                                ></p>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dob" className="form-label">
                                    Date Of Birth
                                </label>
                                <input
                                    type="date"
                                    onClick={handleDate}
                                    className="form-control"
                                    required
                                    onChange={(event) =>
                                        setDOB(event.target.value)
                                    }
                                    max={'2006-12-31'}
                                />
                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="dateMsg"
                                ></p>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="gender" className="form-label">
                                    Gender
                                </label>
                                <select
                                    title="genderSelection"
                                    value={gender}
                                    className="form-select"
                                    onChange={(event) =>
                                        setGender(event.target.value)
                                    }
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="religion"
                                    className="form-label"
                                >
                                    Religion
                                </label>
                                <select
                                    title="Religion"
                                    value={religion}
                                    className="form-select"
                                    onChange={(event) =>
                                        setReligion(event.target.value)
                                    }
                                >
                                    <option>None</option>
                                    <option>Islam</option>
                                    <option>Hinduism</option>
                                    <option>Christianity</option>
                                    <option>Buddhism</option>
                                    <option>Sikhism</option>
                                    <option>Others</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="nationality"
                                    className="form-label"
                                >
                                    Nationality
                                </label>
                                <select
                                    title="Nationality"
                                    value={nationality}
                                    className="form-select"
                                    onChange={(event) =>
                                        setNationality(event.target.value)
                                    }
                                >
                                    <option>Indian</option>
                                    <option>NRI</option>
                                    <option>None of the above</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="maritalStatus"
                                    className="form-label"
                                >
                                    Marital Status
                                </label>
                                <select
                                    title="marital status"
                                    value={maritalStatus}
                                    className="form-select"
                                    onChange={(event) =>
                                        setMaritalStatus(event.target.value)
                                    }
                                >
                                    <option>Married</option>
                                    <option>Single</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="hobbies" className="form-label">
                                    Hobbies
                                </label>
                                <input
                                    type="text"
                                    placeholder="Reading Books"
                                    className="form-control"
                                    onClick={() => {
                                        document.getElementById(
                                            'hobbyMsg'
                                        ).innerText =
                                            'Enter your hobbie(s) separated by commas.'
                                        setTimeout(() => {
                                            document.getElementById(
                                                'hobbyMsg'
                                            ).innerText = ''
                                        }, 4000)
                                    }}
                                    onChange={(event) =>
                                        setHobbies(event.target.value)
                                    }
                                />

                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="hobbyMsg"
                                ></p>
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="languages"
                                    className="form-label"
                                >
                                    Languages Known
                                </label>
                                <input
                                    type="text"
                                    placeholder="English"
                                    className="form-control"
                                    onClick={() => {
                                        document.getElementById(
                                            'langMsg'
                                        ).innerText =
                                            'Enter language(s) known separated by commas.'
                                        setTimeout(() => {
                                            document.getElementById(
                                                'langMsg'
                                            ).innerText = ''
                                        }, 4000)
                                    }}
                                    onChange={(event) =>
                                        setLang(event.target.value)
                                    }
                                />

                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="langMsg"
                                ></p>
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="inputAddress"
                                    className="form-label"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    placeholder=""
                                    onChange={(event) =>
                                        setAddress(event.target.value)
                                    }
                                />
                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="addressMsg"
                                ></p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h5 className="text-primary">
                                    <i className="bi bi-briefcase">
                                        {' '}
                                        Experience
                                    </i>
                                </h5>
                                <div>
                                    <Button
                                        variant="primary"
                                        onClick={() => setModal1Show(true)}
                                    >
                                        Add Experience
                                    </Button>

                                    <ExperienceModal
                                        Id={resumeID}
                                        Registration_Id={registrationId}
                                        show={modal1Show}
                                        onHide={() => setModal1Show(false)}
                                        heading="Add Experience"
                                        position="Position / Job-Role "
                                        company="Company"
                                        startDate="Date of Joining"
                                        endDate="Date of Resignation"
                                        jobDesc="Job Description"
                                        onAddExperience={handleAddExperience}
                                    />
                                </div>
                            </div>
                            {experienceData.length !== 0
                                ? experienceData.map((element) => (
                                      <div
                                          key={element.id}
                                          className="col-12 col-md-6 p-2"
                                      >
                                          <div className="p-2 border rounded">
                                              <div className="d-flex justify-content-between">
                                                  <h6>{element.position}</h6>
                                                  <button
                                                      onClick={async () => {
                                                          let choice =
                                                              window.prompt(
                                                                  'Do you want to delete this experience (y/n): '
                                                              )
                                                          if (choice == 'y') {
                                                              try {
                                                                  await axios
                                                                      .delete(
                                                                          `http://localhost:3000/experience/${element.id}`
                                                                      )
                                                                      .then(
                                                                          (
                                                                              response
                                                                          ) =>
                                                                              toast(
                                                                                  response.data
                                                                              )
                                                                      )
                                                              } catch (error) {
                                                                  console.log(
                                                                      error
                                                                  )
                                                              }
                                                          } else if (
                                                              choice == 'n'
                                                          ) {
                                                              null
                                                          } else {
                                                              toast(
                                                                  'Kindly enter either y or n.'
                                                              )
                                                          }
                                                      }}
                                                  >
                                                      <i className="bi bi-x-lg"></i>
                                                  </button>
                                              </div>
                                              <p className="small text-secondary m-0">
                                                  <i className="bi bi-buildings"></i>{' '}
                                                  {element.company}(
                                                  {element.start_date} -{' '}
                                                  {element.end_date})
                                              </p>
                                              <p className="small text-secondary m-0">
                                                  {element.job_desc}
                                              </p>
                                          </div>
                                      </div>
                                  ))
                                : null}

                            <hr />
                            <div className="d-flex justify-content-between">
                                <h5 className="text-primary">
                                    <i className="bi bi-journal-bookmark">
                                        {' '}
                                        Education
                                    </i>
                                </h5>
                                <div>
                                    <Button
                                        variant="success"
                                        onClick={() => setModal2Show(true)}
                                    >
                                        Add Education
                                    </Button>

                                    <EducationModal
                                        Id={resumeID}
                                        Registration_Id={registrationId}
                                        show={modal2Show}
                                        onHide={() => setModal2Show(false)}
                                        heading="Add Education"
                                        course="Course / Degree "
                                        institution="Institution / Board"
                                        startDate="Date of Joining"
                                        endDate="Date of Completion"
                                    />
                                </div>
                            </div>
                            {educationData.length !== 0
                                ? educationData.map((element) => (
                                      <div
                                          key={element.id}
                                          className="col-12 col-md-6 p-2"
                                      >
                                          <div className="p-2 border rounded">
                                              <div className="d-flex justify-content-between">
                                                  <h6>{element.course}</h6>
                                                  <button
                                                      onClick={async () => {
                                                          let choice =
                                                              window.prompt(
                                                                  'Do you want to delete this education (y/n): '
                                                              )
                                                          if (choice == 'y') {
                                                              try {
                                                                  await axios
                                                                      .delete(
                                                                          `http://localhost:3000/education/${element.id}`
                                                                      )
                                                                      .then(
                                                                          (
                                                                              response
                                                                          ) =>
                                                                              toast(
                                                                                  response.data
                                                                              )
                                                                      )
                                                              } catch (error) {
                                                                  console.log(
                                                                      error
                                                                  )
                                                              }
                                                          } else if (
                                                              choice == 'n'
                                                          ) {
                                                              null
                                                          } else {
                                                              toast(
                                                                  'Kindly enter either y or n.'
                                                              )
                                                          }
                                                      }}
                                                  >
                                                      <i className="bi bi-x-lg"></i>
                                                  </button>
                                              </div>
                                              <p className="small text-secondary m-0">
                                                  <i className="bi bi-book"></i>{' '}
                                                  {element.institute} (
                                                  {element.start_date} -{' '}
                                                  {element.end_date})
                                              </p>
                                              <p className="small text-secondary m-0">
                                                  {element.grade}
                                              </p>
                                          </div>
                                      </div>
                                  ))
                                : null}

                            <hr />
                            <div className="d-flex justify-content-between">
                                <h5 className="text-primary">
                                    <i className="bi bi-boxes"> Skills</i>
                                </h5>
                                <div>
                                    <Button
                                        variant="warning"
                                        onClick={() => setModal3Show(true)}
                                    >
                                        Add Skills
                                    </Button>
                                    <SkillModal
                                        Id={resumeID}
                                        Registration_Id={registrationId}
                                        show={modal3Show}
                                        onHide={() => setModal3Show(false)}
                                        heading="Skill-set"
                                    />
                                </div>
                            </div>

                            {skillData.length !== 0
                                ? skillData.map((element) => (
                                      <div
                                          key={element.id}
                                          className="col-12 col-md-6 p-2"
                                      >
                                          <div className="p-2 border rounded">
                                              <div className="d-flex justify-content-between ">
                                                  <h6 className="bi bi-caret-right">
                                                      {element.skill}
                                                  </h6>
                                                  <button
                                                      onClick={async () => {
                                                          let choice =
                                                              window.prompt(
                                                                  'Do you want to delete this skill (y/n): '
                                                              )
                                                          if (choice == 'y') {
                                                              try {
                                                                  await axios
                                                                      .delete(
                                                                          `http://localhost:3000/skill/${element.id}`
                                                                      )
                                                                      .then(
                                                                          (
                                                                              response
                                                                          ) =>
                                                                              toast(
                                                                                  response.data
                                                                              )
                                                                      )
                                                              } catch (error) {
                                                                  console.log(
                                                                      error
                                                                  )
                                                              }
                                                          } else if (
                                                              choice == 'n'
                                                          ) {
                                                              null
                                                          } else {
                                                              toast(
                                                                  'Kindly enter either y or n.'
                                                              )
                                                          }
                                                      }}
                                                  >
                                                      <i className="bi bi-x-lg"></i>
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  ))
                                : null}
                            <div className="col-12 text-end">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    <i className="bi bi-floppy"> Save Resume</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateResume
