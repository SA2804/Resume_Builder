import { useLocation, useNavigate } from 'react-router-dom'
import '../../public/styles/MyResume.css'
import html2canvas from 'html2canvas'
import { useState } from 'react'
import jsPDF from 'jspdf'
import DrawerComponent from './UI/TempDrawer'
import ButtonControl from './UI/ButtonControl'
import Img1 from '../../public/assets/tiles/tile1.png'
import Img2 from '../../public/assets/tiles/tile2.png'
import Img3 from '../../public/assets/tiles/tile3.png'
import Img4 from '../../public/assets/tiles/tile4.png'
import Img5 from '../../public/assets/tiles/tile5.png'
import Img6 from '../../public/assets/tiles/tile6.png'
import Img7 from '../../public/assets/tiles/tile7.png'
import Img8 from '../../public/assets/tiles/tile8.png'
import Img9 from '../../public/assets/tiles/tile9.png'
import Img10 from '../../public/assets/tiles/tile10.png'
import Img11 from '../../public/assets/tiles/tile11.png'
import Img12 from '../../public/assets/tiles/tile12.png'
import Img13 from '../../public/assets/tiles/tile13.png'
import Img14 from '../../public/assets/tiles/tile14.png'
import Img15 from '../../public/assets/tiles/tile15.png'
import Img16 from '../../public/assets/tiles/tile16.png'
import Img17 from '../../public/assets/tiles/tile17.png'
import Img18 from '../../public/assets/tiles/tile18.png'
import Img19 from '../../public/assets/tiles/tile19.png'
import Img20 from '../../public/assets/tiles/tile20.png'
import Img21 from '../../public/assets/tiles/tile21.png'
import Img22 from '../../public/assets/tiles/tile22.png'
import Img23 from '../../public/assets/tiles/tile23.jpg'

function MyResume() {
    const navigate = useNavigate()
    const location = useLocation()
    const {
        personalInfo = {},
        expInfo = {},
        eduInfo = {},
        skillInfo = {},
    } = location.state || {}
    console.log(personalInfo, expInfo, eduInfo, skillInfo)
    const date = new Date()
    const current = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
    const [selectedFont, setSelectedFont] = useState('Arial')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const fontOptions = [
        'Arial',
        'Times New Roman',
        'Courier New',
        'Verdana',
        'Georgia',
        'Comic Sans MS',
        'Tahoma',
        'Lucida Sans Unicode',
        'Garamond',
    ]

    const handleFontChange = (e) => {
        setSelectedFont(e.target.value)
    }

    const downloadPDF = () => {
        const input = document.getElementById('resume-content')
        const style = document.createElement('style')
        style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=${selectedFont.replace(' ', '+')}:wght@400;700&display=swap');
      body { font-family: '${selectedFont}', sans-serif; }
    `
        document.head.appendChild(style)

        // Generate PDF after the font is loaded
        setTimeout(() => {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png')
                const pdf = new jsPDF('p', 'mm', 'a4')
                const pdfWidth = pdf.internal.pageSize.getWidth()
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
                pdf.save('resume.pdf')

                // Remove the style element after generating the PDF
                document.head.removeChild(style)
            })
        }, 1000) // Adjust the timeout based on font loading time
    }

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <>
            <div className="d-flex justify-content-around bg-black p-2">
                <button
                    className="bi bi-arrow-left-circle"
                    onClick={() => navigate('/homePage')}
                >
                    {' '}
                    Back
                </button>
                <button onClick={downloadPDF}>Download as PDF</button>
                <select value={selectedFont} onChange={handleFontChange}>
                    {fontOptions.map((font, index) => (
                        <option key={index} value={font}>
                            {font}
                        </option>
                    ))}
                </select>
                <ButtonControl
                    onClick={toggleDrawer}
                    isOpen={drawerOpen}
                    color=""
                >
                    Background
                </ButtonControl>
                <DrawerComponent
                    isOpen={drawerOpen}
                    onClose={toggleDrawer}
                    content={[
                        Img1,
                        Img2,
                        Img3,
                        Img4,
                        Img5,
                        Img6,
                        Img7,
                        Img8,
                        Img9,
                        Img10,
                        Img11,
                        Img12,
                        Img13,
                        Img14,
                        Img15,
                        Img16,
                        Img17,
                        Img18,
                        Img19,
                        Img20,
                        Img21,
                        Img22,
                        Img23,
                    ]}
                />
            </div>
            <div
                className="page mt-0 fs-5 border-2 border-black mt-1 mb-1"
                id="resume-content"
                style={{ fontFamily: selectedFont }}
            >
                <div className="subpage">
                    <table className="w-100">
                        <tbody>
                            <tr>
                                <td
                                    colSpan="2"
                                    className="text-center fw-bold fs-4 pb-3"
                                >
                                    <u>{personalInfo[0].title}</u>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="personal-info zsection">
                                    <div className="fw-bold name">
                                        {personalInfo[0].name}
                                    </div>
                                    <div>
                                        Mobile :
                                        <span className="mobile">
                                            +91-{personalInfo[0].mobile_no}
                                        </span>
                                    </div>
                                    <div>
                                        Email :{' '}
                                        <span className="email">
                                            {personalInfo[0].email}
                                        </span>
                                    </div>
                                    <div>
                                        Address :{' '}
                                        <span className="address">
                                            {personalInfo[0].address}
                                        </span>
                                    </div>
                                    <hr />
                                </td>
                            </tr>

                            <tr className="experience-section zsection">
                                <td className="fw-bold align-top text-nowrap pr title">
                                    Experience:
                                </td>
                                {expInfo.map((element) => {
                                    return (
                                        <tr key={element.id}>
                                            <td className="pb-3 experiences">
                                                <div className="experience mb-2">
                                                    <div className="fw-bold">
                                                        <span className="job-role">
                                                            {element.position}
                                                        </span>
                                                    </div>
                                                    <div className="company">
                                                        {element.company}
                                                    </div>
                                                    <div>
                                                        <span className="working-from">
                                                            {element.start_date}
                                                        </span>{' '}
                                                        to{' '}
                                                        <span className="working-to">
                                                            {element.end_date}
                                                        </span>
                                                    </div>
                                                    <div className="work-description">
                                                        {element.job_desc}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tr>

                            <tr className="education-section zsection">
                                <td className="fw-bold align-top text-nowrap pr title">
                                    Education:
                                </td>
                                {eduInfo.map((element) => {
                                    return (
                                        <tr key={element.id}>
                                            <td className="pb-3 educations">
                                                <div className="education mb-2">
                                                    <div className="fw-bold">
                                                        <span className="course">
                                                            {element.course}
                                                        </span>
                                                    </div>
                                                    <div className="institute">
                                                        {element.institute}
                                                    </div>
                                                    <div>
                                                        <span className="working-from">
                                                            {element.start_date}
                                                        </span>{' '}
                                                        to{' '}
                                                        <span className="working-to">
                                                            {element.end_date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tr>

                            <tr className="skills-section zsection">
                                <td className="fw-bold align-top text-nowrap pr title">
                                    Skills:
                                </td>
                                <td className="pb-3 skills">
                                    {skillInfo.map((element) => {
                                        return (
                                            <tr key={element.id}>
                                                <td className="pb-3 educations">
                                                    <div className="skill">
                                                        {element.skill}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </td>
                            </tr>

                            <tr className="personal-details-section zsection">
                                <td className="fw-bold align-top text-nowrap pr title">
                                    Personal Details:
                                </td>
                                <td className="pb-3">
                                    <table className="pd-table">
                                        <tbody>
                                            <tr>
                                                <td>Date of Birth</td>
                                                <td>
                                                    :{' '}
                                                    <span className="date-of-birth">
                                                        {personalInfo[0].dob}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td>
                                                    :{' '}
                                                    <span className="gender">
                                                        {personalInfo[0].gender}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Religion</td>
                                                <td>
                                                    :{' '}
                                                    <span className="religion">
                                                        {
                                                            personalInfo[0]
                                                                .religion
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Nationality</td>
                                                <td>
                                                    :{' '}
                                                    <span className="nationality">
                                                        {
                                                            personalInfo[0]
                                                                .nationality
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Marital Status</td>
                                                <td>
                                                    :{' '}
                                                    <span className="marital-status">
                                                        {
                                                            personalInfo[0]
                                                                .marital_status
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Hobbies</td>
                                                <td>
                                                    :{' '}
                                                    <span className="hobbies">
                                                        {
                                                            personalInfo[0]
                                                                .hobbies
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr className="languages-known-section zsection">
                                <td className="fw-bold align-top text-nowrap pr title">
                                    Languages Known:
                                </td>
                                <td className="pb-3 languages">
                                    {personalInfo[0].languages_known}
                                </td>
                            </tr>

                            <tr className="declaration-section zsection">
                                <td className="fw-bold align-top text-nowrap pr title">
                                    Declaration:
                                </td>
                                <td className="pb-4 declaration">
                                    I hereby declare that above information is
                                    correct to the best of my knowledge and can
                                    be supported by relevant documents as and
                                    when required.
                                </td>
                            </tr>
                            <tr>
                                <td className="px-3 pb-5">Date :{current}</td>
                                <td className="px-3 name text-end pb-5">
                                    {personalInfo[0].name}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MyResume
