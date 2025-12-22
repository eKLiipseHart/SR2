import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../styled-components';
import { ALL_SPECIES } from '../CONSTANTS';

function SkillTree() {
  // Stores the species KEY (e.g. "species_bothan")
  const [speciesSelected, setSpeciesSelected] = useState('');

  // Dropdown open / close
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref for click-outside handling
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get display label safely
  const getSpeciesLabel = (key) => {
    return (
      ALL_SPECIES[key]?.label?.replace(' Species Features', '') ||
      'Species:'
    );
  };

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
        {/* Selected value */}
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
            {Object.entries(ALL_SPECIES).map(([key, data]) => (
              <div
                key={key}
                onClick={() => {
                  setSpeciesSelected(key);
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
                {data.label.replace(' Species Features', '')}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected species display */}
      {speciesSelected && (
        <p style={{ color: '#fff', marginTop: '4px' }}>
          Selected species: {getSpeciesLabel(speciesSelected)}
        </p>
      )}

      {/* Example: species modifiers (safe access) */}
      {speciesSelected &&
        ALL_SPECIES[speciesSelected]?.modifiers && (
          <pre style={{ color: '#fff', marginTop: '8px' }}>
            {JSON.stringify(
              ALL_SPECIES[speciesSelected].modifiers,
              null,
              2
            )}
          </pre>
        )}
    </Container>
  );
}

export default SkillTree;
