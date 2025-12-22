console.log('ALL_SPECIES:', ALL_SPECIES);
import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../styled-components';
import { ALL_SPECIES } from '../CONSTANTS';

function SkillTree() {
  // Selected species (stores the KEY, e.g. "species_bothan")
  const [speciesSelected, setSpeciesSelected] = useState('');

  // Dropdown open/close
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Click-outside detection
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to get display name
  const getSpeciesLabel = (key) =>
    ALL_SPECIES[key]?.replace(' Species Features', '') || '';

  return (
    <Container
      className="skillTree"
      style={{
        overflow: 'visible',
        position: 'relative',
        padding: '8px',
      }}
    >
      <h2>Select Species</h2>

      {/* Species Dropdown */}
      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '300px',
          marginBottom: '8px',
        }}
      >
        {/* Selected value box */}
        <div
          onClick={() => setDropdownOpen((prev) => !prev)}
          style={{
            padding: '8px',
            backgroundColor: '#0089a5',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {speciesSelected ? getSpeciesLabel(speciesSelected) : 'Species:'}
        </div>

        {/* Dropdown list */}
        {dropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: '50vh',
              overflowY: 'auto',
              backgroundColor: '#008ca7',
              border: '1px solid #36b2bc',
              borderRadius: '0 0 8px 8px',
              zIndex: 1000,
            }}
          >
            {Object.entries(ALL_SPECIES).map(([id, label]) => (
              <div
                key={id}
                onClick={() => {
                  setSpeciesSelected(id);
                  setDropdownOpen(false);
                }}
                style={{
                  padding: '6px 8px',
                  cursor: 'pointer',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#00434c')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#008ca7')
                }
              >
                {label.replace(' Species Features', '')}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display selected species */}
      {speciesSelected && (
        <p style={{ color: '#fff', marginTop: '4px' }}>
          Selected species: {getSpeciesLabel(speciesSelected)}
        </p>
      )}

      {/* Other skill tree content */}
    </Container>
  );
}

export default SkillTree;

