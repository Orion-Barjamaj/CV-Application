import { useState } from 'react';
import plus from './assets/plus-symbol-button.png';
import rightArrow from './assets/right-arrow.png';
import leftArrow from './assets/left-arrow.png';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import CVDoc from './CV.jsx';

let cvArray = [{
  profilePicture: '',
  name: '',
  lastName: '',
  emailAdress: '',
  phoneNumber: '',
  website: '',
  linkedIn: '',
  skills: [],
  education: [],
  workExperience: []
}];

if(!localStorage.getItem('CV-Info')){
  localStorage.setItem('CV-Info', JSON.stringify(cvArray));
}

function GetStartedPage({handleClick}){
  return (
    <>
      <h1 className='welcomeHeader animation'>Unleash your potential with a CV that stands out</h1>
      <p className='shortDesc animation'>Create a professional and impactful CV in <b>minutes</b> with our easy-to-use CV maker. Stand out to employers with a customized and polished resume that showcases your skills and experience.</p>
      <div className='btnContainer'>
        <button className='getStartedBtn button animation' onClick={handleClick}>Get Started</button>
        <button className='learnMoreBtn button animation'><a href='https://github.com/Orion-Barjamaj/CV-Application' target='_blank'>Learn More</a></button>
      </div>
    </>
  )
}

function GeneralInfo({stepIndex, fileSet, imgFile}){
  let savedCV = JSON.parse(localStorage.getItem("CV-Info"));

  const [generalInfo, setGeneralInfo] = useState({
    profilePicture: '',
    name: cvArray[0].name,
    lastName: cvArray[0].lastName,
    emailAdress: cvArray[0].emailAdress,
    phoneNumber: cvArray[0].phoneNumber,
    website: cvArray[0].website,
    linkedIn: cvArray[0].linkedIn,
  });

  function handleChange(e) {
    fileSet(URL.createObjectURL(e.target.files[0]));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo({
      ...generalInfo,
      [name]: value,
    });
  };

  const handleClick = (e) => {
    stepIndex();
    savedCV[0].name = generalInfo.name;
    savedCV[0].lastName = generalInfo.lastName;
    savedCV[0].emailAdress = generalInfo.emailAdress;
    savedCV[0].phoneNumber = generalInfo.phoneNumber;
    savedCV[0].website = generalInfo.website;
    savedCV[0].linkedIn = generalInfo.linkedIn;
    localStorage.setItem('CV-Info', JSON.stringify(savedCV));
    cvArray[0] = savedCV[0];
  }

  return (
    <div className='bigContainer animation'>
      <div className='headerContent'>
        <h2 className='personalDetails'>General Information</h2>
      </div>
      <form className='generalInfoContainer'>
        <div className='picInputHolder'>
          <label htmlFor="profilePic" className='picLabel generalLabel'>Upload Profile Picture</label>
          <label className='labelForClick' style={imgFile === undefined ? {opacity: '.5'} : {opacity: '1'}}htmlFor='profilePic'><img src={imgFile === undefined ? plus : imgFile} style={imgFile === undefined ? {width: '100px', height: '100px'} : {width: '270px', height: '320px', objectFit: 'cover', borderRadius: '5px'}} className='plusSymbol' alt='createCV'></img></label>
          <input value={generalInfo.profilePicture} name='profilePicture' onChange={handleChange} type='file' className='inputPic' id='profilePic'></input>
        </div>  
        <div className='holderForThings'>
          <label htmlFor="Name" className='nameLabel generalLabel'>First Name *</label>
          <input value={generalInfo.name} name='name' onChange={handleInputChange} type='text' className='name nameInput inputFocus' id='Name' required placeholder='Bill...'></input>
          <label htmlFor="LastName" className='lastNameLabel generalLabel'>Last Name *</label>
          <input value={generalInfo.lastName} name='lastName' onChange={handleInputChange} type='text' className='lastName nameInput inputFocus' id='LastName' required placeholder='Gates...'></input>
          <label htmlFor="emailAddres" className='emailAddresLabel generalLabel'>Email Addres *</label>
          <input value={generalInfo.emailAdress} name='emailAdress' onChange={handleInputChange} type='email' className='emailAddresInput nameInput inputFocus' id='emailAddres'required placeholder='youremail@domain.com'></input>
          <label htmlFor="phoneNum" className='phoneNumberLabel generalLabel'>Phone Number *</label>
          <input value={generalInfo.phoneNumber} name='phoneNumber' onChange={handleInputChange} type='tel' className='phoneNumberInput nameInput inputFocus' id='phoneNum' placeholder='123-456-7890' required ></input>
        </div>  
        <div className='websiteHolder'>
        <label htmlFor="web" className='websiteLabel generalLabel'>Website *optional</label>
        <input value={generalInfo.website} name='website' onChange={handleInputChange} type='url' className='website websiteInput inputFocus' id='web' placeholder='www.yourwebsite.com'></input>
        <label htmlFor="LinkedIn" className='LinkedInLabel generalLabel'>LinkedIn *optional</label>
        <input value={generalInfo.linkedIn} name='linkedIn' onChange={handleInputChange} type='url' className='LinkedInInput websiteInput inputFocus' id='LinkedIn' placeholder='www.yourlinkedin.com'></input>
        </div>
      </form>
      <div className='skillsBtnContainer'>
        <button className='animation experienceBtn' id='stepOneBtn' onClick={handleClick}>Next<img src={rightArrow} alt='skillsCV' className='rightArrow'></img></button>
      </div>
    </div>
  )
}

function Skills({handleNext, handlePrevious}){
  let savedCV = JSON.parse(localStorage.getItem("CV-Info"));
  const [skill, setSkill] = useState('');
  const [skillArray, setSkillArray] = useState([savedCV[0].skills]);

  const setArray = ({id, name}) => {
    setSkillArray([{id: id, name: name}, ...skillArray]);
    savedCV[0].skills.push({id: id, name: name});
    localStorage.setItem('CV-Info', JSON.stringify(savedCV));
    const input = document.getElementById('skillInput').focus();
    setSkill('');
  }

  const handleRemove = ({skll}) => {
    setSkillArray(skillArray.filter(skillElement => skillElement.id !== skll.id));
      const skillIndex = savedCV[0].skills.findIndex(removeId => removeId.id === skll.id);
      if (skillIndex !== -1) {
        savedCV[0].skills.splice(skillIndex, 1);
      }
      localStorage.setItem('CV-Info', JSON.stringify(savedCV));
  }

  return(
    <div className='skillsContainer animation'>
      <div className='headerContent'>
        <h2 className='personalDetails'>Skills</h2>
      </div>
      <div className='generalInfoContainer skillsInputContainer'>
        <p className='skillsExample'>In here, highlight your key abilities and competencies relevant to the job. Include technical skills like programming languages (e.g., JavaScript, Python), web development tools (e.g., React, Node.js), and databases (e.g., MySQL). Mention soft skills such as communication, teamwork, and problem-solving. List any certifications (e.g., Certified Scrum Master) and courses (e.g., Google Data Analytics). Add languages you speak and any industry-specific skills pertinent to your field (e.g., digital marketing, financial analysis).</p>
        <div className='lineSkills'></div>    
        <label htmlFor='skillInput' className='skillLabel'>Enter Skill</label>
        <div className='enterSkillContainer'>    
          <input value={skill} onChange={e => setSkill(e.target.value)} type='text' className='nameInput inputFocus skillInput' id='skillInput'></input>
          <button className='addSkill' onClick={() =>
            {setArray({id: uuidv4(), name: skill})}}>Add</button>
        </div>
        <div className='allSkills'>
          {savedCV[0].skills.map(skills => (
            <div key={skills.id} className='skillHolder'>
              <div className='skills'>{skills.name}</div>
              <button className='removeSkill' onClick={() => handleRemove({skll: skills})}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      <div className='skillsBtnContainer'>
          <button className='previousButton' onClick={handlePrevious}><img src={leftArrow} alt='skillsCV' className='leftArrow'></img>Previous</button>
          <button className='experienceBtn' onClick={handleNext}>Next<img src={rightArrow} alt='skillsCV' className='rightArrow'></img></button>
        </div>
    </div>
  )
}

function Education({ handleNext, handlePrevious }) {
  let savedCV = JSON.parse(localStorage.getItem("CV-Info"));  
  const [educationInfo, setEducationInfo] = useState({
    id: '',
    degree: '',
    city: '',
    school: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [educationArray, setEducationArray] = useState([savedCV[0].education]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationInfo({
      ...educationInfo,
      [name]: value,
    });
  };

  const handleSaveEducation = () => {
    let setID = uuidv4();

    setEducationArray([
      {
        ...educationInfo,
        id: setID,
      },
      ...educationArray,
    ]);

    savedCV[0].education.push({...educationInfo, id: setID});
    localStorage.setItem('CV-Info', JSON.stringify(savedCV));

    setEducationInfo({
      id: '',
      degree: '',
      city: '',
      school: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleRemove = ({education}) => {
      setEducationArray(educationArray.filter(educationElement => educationElement.id !== education.id));
      const skillIndex = savedCV[0].education.findIndex(removeId => removeId.id === education.id);
      if (skillIndex !== -1) {
        savedCV[0].education.splice(skillIndex, 1);
      }
      localStorage.setItem('CV-Info', JSON.stringify(savedCV));
  }

  return (
    <div className='educationContainer animation'>
      <div className='headerContent'>
        <h2 className='personalDetails'>Education & Qualifications</h2>
      </div>
      <div className='educationInfo'>
        <div className='educationInputContainer'>
          <label htmlFor='degree' className='generalLabel degreeLabel'>Degree</label>
          <input
            value={educationInfo.degree}
            name='degree'
            onChange={handleInputChange}
            type='text'
            id='degree'
            className='nameInput degreeInput'
            placeholder='e.g Bachelor of Science'
          />
          <label htmlFor='city' className='generalLabel cityLabel'>City/Town</label>
          <input
            value={educationInfo.city}
            name='city'
            onChange={handleInputChange}
            type='text'
            id='city'
            className='nameInput cityInput'
            placeholder='e.g New York'
          />
          <label htmlFor='school' className='generalLabel schoolLabel'>School</label>
          <input
            value={educationInfo.school}
            name='school'
            onChange={handleInputChange}
            type='text'
            id='school'
            className='nameInput schoolInput'
            placeholder='e.g New York University'
          />
          <label htmlFor='startDate' className='generalLabel startDateLabel'>Start Date</label>
          <input
            value={educationInfo.startDate}
            name='startDate'
            onChange={handleInputChange}
            type='month'
            id='startDate'
            className='nameInput startDateInput'
          />
          <label htmlFor='endDate' className='generalLabel endDateLabel'>End Date</label>
          <input
            value={educationInfo.endDate}
            name='endDate'
            onChange={handleInputChange}
            type='month'
            id='endDate'
            className='nameInput endDateInput'
          />
          <label htmlFor='description' className='generalLabel descEducationLabel'>Description</label>
          <textarea
            value={educationInfo.description}
            name='description'
            onChange={handleInputChange}
            id='description'
            className='descEducationInput'
          />
        </div>
        <div className='addNewEducation'>
          <button className='saveEducationButton draw-border' onClick={handleSaveEducation}>Save</button>
          <div className='savedEducationContainer'>
            {savedCV[0].education.map((edu) => (
              <>
                <div key={edu.id} className='savedEducation'>
                  {edu.degree} <br></br> <span>{edu.startDate} - {edu.endDate}</span>
                </div>
                <button className='removeEducation' onClick={() => handleRemove({education: edu})}></button>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className='skillsBtnContainer'>
          <button className='previousButton' onClick={handlePrevious}>
            <img src={leftArrow} alt='skillsCV' className='leftArrow' />
            Previous
          </button>
          <button className='experienceBtn' onClick={handleNext}>
            Next
            <img src={rightArrow} alt='skillsCV' className='rightArrow' />
          </button>
        </div>
    </div>
  );
}

function WorkExperience({ handleNext, handlePrevious }) {
  let savedCV = JSON.parse(localStorage.getItem("CV-Info"));  
    const [workInfo, setWorkInfo] = useState({
    id: '',
    jobTitle: '',
    city: '',
    employer: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [workArray, setWorkArray] = useState([savedCV[0].workExperience]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkInfo({
      ...workInfo,
      [name]: value,
    });
  };

  const handleSaveEducation = () => {
    let setID = uuidv4();
    setWorkArray([
      {
        ...workInfo,
        id: setID,
      },
      ...workArray,
    ]);

    savedCV[0].workExperience.push({...workInfo, id: setID});
    localStorage.setItem('CV-Info', JSON.stringify(savedCV));

    setWorkInfo({
      id: '',
      jobTitle: '',
      city: '',
      employer: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleRemove = ({work}) => {
    setWorkArray(workArray.filter(workElement => workElement.id !== work.id));
    const skillIndex = savedCV[0].workExperience.findIndex(removeId => removeId.id === work.id);
    if (skillIndex !== -1) {
      savedCV[0].workExperience.splice(skillIndex, 1);
    }
    localStorage.setItem('CV-Info', JSON.stringify(savedCV));
}

  return (
    <div className='educationContainer animation'>
      <div className='headerContent'>
        <h2 className='personalDetails'>Work Experience</h2>
      </div>
      <div className='educationInfo'>
        <div className='educationInputContainer'>
          <label htmlFor='jobTitle' className='generalLabel jobTitleLabel'>Job Title</label>
          <input
            value={workInfo.jobTitle}
            name='jobTitle'
            onChange={handleInputChange}
            type='text'
            id='jobTitle'
            className='nameInput degreeInput'
            placeholder='e.g CEO'
          />
          <label htmlFor='city' className='generalLabel cityLabel'>City/Town</label>
          <input
            value={workInfo.city}
            name='city'
            onChange={handleInputChange}
            type='text'
            id='city'
            className='nameInput cityInput'
            placeholder='e.g Chicago'
          />
          <label htmlFor='employer' className='generalLabel employerLabel'>Employer</label>
          <input
            value={workInfo.employer}
            name='employer'
            onChange={handleInputChange}
            type='text'
            id='employer'
            className='nameInput schoolInput'
            placeholder='e.g Apple'
          />
          <label htmlFor='startDate' className='generalLabel startDateLabel'>Start Date</label>
          <input
            value={workInfo.startDate}
            name='startDate'
            onChange={handleInputChange}
            type='month'
            id='startDate'
            className='nameInput startDateInput'
          />
          <label htmlFor='endDate' className='generalLabel endDateLabel'>End Date</label>
          <input
            value={workInfo.endDate}
            name='endDate'
            onChange={handleInputChange}
            type='month'
            id='endDate'
            className='nameInput endDateInput'
          />
          <label htmlFor='description' className='generalLabel descEducationLabel'>Description</label>
          <textarea
            value={workInfo.description}
            name='description'
            onChange={handleInputChange}
            id='description'
            className='descEducationInput'
          />
        </div>
        <div className='addNewEducation'>
          <button className='saveEducationButton draw-border' onClick={handleSaveEducation}>Save</button>
          <div className='savedEducationContainer'>
            {savedCV[0].workExperience.map((work) => (
              <>
                <div key={work.id} className='savedEducation'>
                  {work.jobTitle} <br></br> <span>{work.startDate} - {work.endDate}</span>
                </div>
                <button className='removeEducation' onClick={() => handleRemove({work: work})}></button>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className='skillsBtnContainer'>
          <button className='previousButton' onClick={handlePrevious}>
            <img src={leftArrow} alt='skillsCV' className='leftArrow' />
            Previous
          </button>
          <button className='experienceBtn' onClick={handleNext}>
            Finish
            <img src={rightArrow} alt='skillsCV' className='rightArrow' />
          </button>
        </div>
    </div>
  );
}

function App() {
  const [file, setFile] = useState();
  const [index, setIndex] = useState(1);

  const handleNext = () => {
    setIndex(index + 1);
  }

  const handlePrevious = () => {
    setIndex(index - 1);
  }

  if(index === 1){
    return <GetStartedPage handleClick={handleNext} />
  }else if(index === 2){
    return <GeneralInfo stepIndex={handleNext} fileSet={setFile} imgFile={file}/>
  } else if(index === 3){
    return <Skills handleNext={handleNext} handlePrevious={handlePrevious}/>
  } else if(index === 4){
    return <Education handleNext={handleNext} handlePrevious={handlePrevious}/>
  } else if(index === 5){
    return <WorkExperience handleNext={handleNext} handlePrevious={handlePrevious}/>
  } else if(index === 6){
    return <CVDoc srcFile={file} handlePrevious={handlePrevious}></CVDoc>
  }
}

export default App;