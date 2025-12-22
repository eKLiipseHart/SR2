import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../styled-components';
import { ALL_SPECIES } from '../CONSTANTS';

function SkillTree() {
  // Parent state for selected species
  const [speciesSelected, setSpeciesSelected] = useState('');

  // Dropdown open/close state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Reference for click outside detection
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

  return (
    <Container className="skillTree" style={{ overflow: 'visible', position: 'relative', padding: '8px' }}>
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
          {speciesSelected
            ? speciesSelected === 'twilek'
              ? "Twi'Lek"
              : speciesSelected.replace('_', ' ')
            : 'Species:'}
        </div>

        {/* Dropdown list */}
        {dropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: '50vh', // scrollable height
              overflowY: 'auto',
              backgroundColor: '#008ca7',
              border: '1px solid #36b2bc',
              borderRadius: '0 0 8px 8px',
              zIndex: 1000,
            }}
          >
            {ALL_SPECIES.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setSpeciesSelected(item); // updates parent state
                  setDropdownOpen(false);   // closes dropdown
                }}
                style={{
                  padding: '6px 8px',
                  cursor: 'pointer',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#00434c')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#008ca7')}
              >
                {item === 'twilek' ? "Twi'Lek" : item.replace('_', ' ')}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Example: Display the currently selected species */}
      {speciesSelected && (
        <p style={{ color: '#fff', marginTop: '4px' }}>
          Selected species: {speciesSelected === 'twilek' ? "Twi'Lek" : speciesSelected.replace('_', ' ')}
        </p>
      )}

      {/* Other skill tree content can go here */}
    </Container>
  );
}

export default SkillTree;
