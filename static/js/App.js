import React, { useEffect, useState, useRef } from 'react';
import { MainContainer, SkillContainer, SideContainer } from './styled-components';
import Professions from './components/Professions';
import Experience from './components/Experience';
import SkillModifiers from './components/SkillModifiers';
import Commands from './components/Commands';
import Certifications from './components/Certifications';
import Titles from './components/Titles';
import ActiveSkillModifiers from './components/ActiveSkillModifiers';
import ActiveCommandsAndCertifications from './components/ActiveCommandsAndCertifications';
import { SKILLS, ALL_SPECIES } from './CONSTANTS';
import SkillTree from './components/SkillTree.jsx';


function App() {
  const [playerSkills, setPlayerSkills] = useState(() => {
    const savedPlayerSkills = localStorage.getItem("playerSkills");
    return JSON.parse(savedPlayerSkills) || [];
  });

  const [skillPointWarning, setSkillPointWarning] = useState(false);
  const [activeSkill, setActiveSkill] = useState('combat_brawler_novice');
  const [activeProfession, setActiveProfession] = useState('combat_brawler');

  // --- Species dropdown state ---
  const [speciesSelected, setSpeciesSelected] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide skill point warning after 2.5s
  useEffect(() => {
    if (skillPointWarning) {
      const timer = setTimeout(() => setSkillPointWarning(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [skillPointWarning]);

  // Save skills to localStorage
  useEffect(() => {
    localStorage.setItem("playerSkills", JSON.stringify(playerSkills));
  }, [playerSkills]);

  const handleProfessionChange = (newProf) => setActiveProfession(newProf);
  const handleActiveSkillChange = (skill) => setActiveSkill(skill);
  const getSkillPoint = (skill) => SKILLS[skill].skillPoints;
  const hasSkillPoints = (sp) => {
    const MAX_SKILL_POINTS = 250;
    const usedPoints = playerSkills.reduce((acc, item) => getSkillPoint(item) + acc, 0);
    return (MAX_SKILL_POINTS - usedPoints - sp) > -1;
  };
  const getPreReqs = (skill) => SKILLS[skill].preReqs;

  const handleSkillChange = ({ action, data }) => {
    if (action === 'add') addSkillsToPlayer(data);
    else if (action === 'reset') setPlayerSkills([]);
    else removeSkillsFromPlayer(data);
  };

  const addSkillsToPlayer = (skill) => {
    let skillsToAdd = [skill];
    for (let i = 0; i < skillsToAdd.length; i++) {
      if (skillsToAdd[i] === "") continue;
      skillsToAdd = [...skillsToAdd, ...getPreReqs(skillsToAdd[i])];
    }

    const filteredSkills = [...new Set(skillsToAdd.filter(item => item && !playerSkills.includes(item)))];
    const newSkillPoints = filteredSkills.reduce((acc, item) => getSkillPoint(item) + acc, 0);

    if (hasSkillPoints(newSkillPoints)) {
      setPlayerSkills([...playerSkills, ...filteredSkills]);
    } else setSkillPointWarning(true);
  };

  const removeSkillsFromPlayer = (skill) => {
    let removeSkills = [skill];
    for (let i = 0; i < removeSkills.length; i++) {
      for (let j = 0; j < playerSkills.length; j++) {
        const preReqs = getPreReqs(playerSkills[j]);
        if (preReqs.includes(removeSkills[i])) removeSkills.push(playerSkills[j]);
      }
    }
    setPlayerSkills(playerSkills.filter((s) => !removeSkills.includes(s)));
  };

  // --- Handle species selection ---
  const handleSpeciesChange = (speciesKey) => {
  // Remove any previously selected species skill
  const newSkills = playerSkills.filter(
    skill => !Object.keys(ALL_SPECIES).includes(skill)
  );

  setPlayerSkills([...newSkills, speciesKey]);
  setSpeciesSelected(speciesKey);
  setDropdownOpen(false);
};


  return (
    <MainContainer>
      <SideContainer>
        <Professions playerSkills={playerSkills} handleProfessionChange={handleProfessionChange} />
        <Experience playerSkills={playerSkills} />
        <SkillModifiers playerSkills={playerSkills} />
      </SideContainer>

      <SkillContainer>
        {/* ===== Custom Species Dropdown ===== */}
        <div ref={wrapperRef} style={{ width: '100%', maxWidth: '300px', marginBottom: '12px', position: 'relative' }}>
          {/* Selected species box */}
          <div
            onClick={() => setDropdownOpen(prev => !prev)}
            style={{
              padding: '8px',
              backgroundColor: '#0089a5',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              userSelect: 'none',
            }}
          >
            <span>
              {speciesSelected
  ? ALL_SPECIES[speciesSelected]?.label.replace(' Species Features', '')
  : 'Species:'}

            </span>
            <span style={{ display: 'inline-block', transition: 'transform 0.2s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          </div>

          {/* Dropdown list */}
          <div
            style={{
              maxHeight: dropdownOpen ? '50vh' : '0',
              overflowY: 'auto',
              transition: 'max-height 0.3s ease',
              backgroundColor: '#008ca7',
              border: '1px solid #36b2bc',
              borderRadius: '0 0 8px 8px',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            {dropdownOpen &&
  Object.entries(ALL_SPECIES).map(([key, data]) => (
    <div
      key={key}
      onClick={() => handleSpeciesChange(key)}
      style={{
        padding: '6px 8px',
        cursor: 'pointer',
        color: '#fff',
        fontWeight: 'bold',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#00434c')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#008ca7')}
    >
      {data.label.replace(' Species Features', '')}
    </div>
  ))
}
 </div>
        </div>

        {/* Optional: display currently selected species */}
        {speciesSelected && (
          <p style={{ color: '#fff', marginBottom: '12px' }}>
            Selected species: {ALL_SPECIES[speciesSelected]?.label.replace(' Species Features', '')}
</p>
        )}

        {/* Existing skill components */}
        <ActiveSkillModifiers activeSkill={activeSkill} />
        <ActiveCommandsAndCertifications activeSkill={activeSkill} />
      </SkillContainer>

      <SideContainer>
        <Commands playerSkills={playerSkills} />
        <Certifications playerSkills={playerSkills} />
        <Titles playerSkills={playerSkills} />
      </SideContainer>
    </MainContainer>
  );
}

export default App;


