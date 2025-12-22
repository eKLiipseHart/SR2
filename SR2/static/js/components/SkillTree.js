import React from 'react';
import { Container } from '../styled-components';
import {
  ALL_PROFESSIONS,
  SKILL_TITLE,
  SKILLS
} from '../CONSTANTS';
import SkillBranch from './SkillBranch';
import SkillBox from './SkillBox';
import Link from './Link';

function SkillTree({
  playerSkills,
  handleProfessionChange,
  handleActiveSkillChange,
  activeProfession,
  handleSkillChange,
  skillPointWarning
}) {
  const profession = ALL_PROFESSIONS[activeProfession];
  const { branch_1, branch_2, branch_3, branch_4 } = profession;
  const playerSkillPoints = playerSkills
    .map(item => SKILLS[item].skillPoints)
    .reduce((acc, item) => item + acc, 0);

  return (
    <Container className="skillTree">
      {/* Skill Title */}
      <h2>{SKILL_TITLE[activeProfession]}</h2>

      {/* Skill Point Warning */}
      {skillPointWarning && <div className="skillPointWarning">NOT ENOUGH SKILLPOINTS</div>}

      {/* Skill Points and Reset */}
      <div className="skillPoints">
        <div>
          SP: <span>{250 - playerSkillPoints}</span>/<span>250</span>
        </div>
        <div>
          <button onClick={() => handleSkillChange({ action: 'reset' })}>Reset Char</button>
        </div>
      </div>

      {/* Master Links */}
      <div className="linkContainer">
        {profession.master_links.map(item => (
          <Link key={item} data={item} handleProfessionChange={handleProfessionChange} />
        ))}
      </div>

      {/* Master Skill Box */}
      <SkillBox
        data={profession.master}
        isActive={playerSkills.includes(profession.master)}
        handleActiveSkillChange={handleActiveSkillChange}
        handleSkillChange={handleSkillChange}
      />

      {/* Skill Branches */}
      <div className="skillBranches">
        {[branch_1, branch_2, branch_3, branch_4].map((branch, index) => (
          <SkillBranch
            key={index}
            data={branch}
            playerSkills={playerSkills}
            handleProfessionChange={handleProfessionChange}
            handleActiveSkillChange={handleActiveSkillChange}
            handleSkillChange={handleSkillChange}
          />
        ))}
      </div>

      {/* Novice Skill Box */}
      <SkillBox
        data={profession.novice}
        isActive={playerSkills.includes(profession.novice)}
        handleActiveSkillChange={handleActiveSkillChange}
        handleSkillChange={handleSkillChange}
      />

      {/* Novice Links */}
      <div className="linkContainer">
        {profession.novice_links.map(item => (
          <Link key={item} data={item} handleProfessionChange={handleProfessionChange} />
        ))}
      </div>
    </Container>
  );
}

export default SkillTree;
