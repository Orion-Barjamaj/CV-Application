import './CV.css';
import phone from './assets/telephone.png';
import email from './assets/email.png';
import website from './assets/world-wide-web.png';
import linkedIn from './assets/linkedin.png';
import { useState } from 'react';
import htmlCanvas from 'html2canvas';
import jsPdf from 'jspdf';

function CVPdf({srcFile, handlePrevious}){

    const [loader, setLoader] = useState(false);
    let savedCV = JSON.parse(localStorage.getItem("CV-Info"));
    const downloadPdf = () => {
        const capture = document.querySelector('.pdfContainer');
        setLoader(true);
        htmlCanvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPdf('a', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            setLoader(false);
            doc.save(`${savedCV[0].name}CV.pdf`);
        })
    }

    return <div className='containerforCV animation'>
        <div className="headContent">
            <h2>Your CV is ready!</h2>
            <div className='cvBtnContainer'>
                <button className='previousButton' onClick={handlePrevious}>Go Back</button>
                <button className='downloadBtn' onClick={downloadPdf} disabled={!(loader=== false)}>{loader ? 'Downloading' : 'Download'}</button>
            </div>
        </div>
        <div className='pdfContainer'>
        <div className="sideBar">
            <img src={srcFile} alt="cvTemplate" className="profilePic" />
            <ul className='contantList List font'>Contact
            <div className='line'></div>
                <li className='font sideList'><img src={phone} alt='CVMaker' className='icon'></img>{savedCV[0].phoneNumber}</li>
                <li className='font sideList'><img src={email} alt='CVMaker' className='icon'></img>{savedCV[0].emailAdress}</li>
                <li className='font'><a className='links sideList' href={savedCV[0].website}><img src={website} alt='CVMaker' className='icon'></img>Website</a></li>
                <li className='font'><a className='links sideList' href={savedCV[0].linkedIn}><img src={linkedIn} alt='CVMaker' className='icon'></img>LinkedIn</a></li>
            </ul>
            <ul className='skillsList List font'>Skills
            <div className='line'></div>
                {savedCV[0].skills.map(skill => (
                    <li key={skill.id} className='font skillsListItems'>{skill.name}</li>
                ))}
            </ul>
        </div>
        <div className='otherHalf'>
            <h1 className='fullName font'>{savedCV[0].name} <br/>{savedCV[0].lastName}</h1>
            <ul className='List font'>Education
            <div className='longLine'></div>
            {savedCV[0].education.map(ed => (
                <li key={ed.id} 
                className='font'>
                    Start date: <b>{ed.startDate}</b>, End Date: <b>{ed.endDate}</b><br />
                    Degree in <b>{ed.degree}</b> at <b>{ed.school}</b> in <b>{ed.city}</b><br />
                    Description:<br />
                    <b>{ed.description}</b></li>
            ))}
            </ul>
            <ul className='List font'>Work Experiences
            <div className='longLine'></div>
            {savedCV[0].workExperience.map(work => (
                <li key={work.id} 
                className='font'>
                    Start date: <b>{work.startDate}</b>, End Date: <b>{work.endDate === "" ? "Present" : work.endDate}</b><br />
                    Work at <b>{work.employer}</b> as a <b>{work.jobTitle}</b> in <b>{work.city}</b><br />
                    Description:<br />
                    <b>{work.description}</b></li>
            ))}
            </ul>
        </div>
    </div>
    </div>
}

export default CVPdf;