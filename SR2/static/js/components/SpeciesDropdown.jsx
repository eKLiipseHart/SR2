import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../styled-components';
import { ALL_SPECIES } from '../CONSTANTS';

function CustomSpeciesDropdown({ speciesSelected, handleSpeciesChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container className="skillTree" style={{ overflow: 'visible', position: 'relative' }}>
      <h2>Choose Species</h2>

      <div
        ref={dropdownRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '300px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {/* Selected value */}
        <div
          onClick={() => setOpen((prev) => !prev)}
          style={{
            padding: '6px 8px',
            backgroundColor: '#0089a5',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '4px',
          }}
        >
          {speciesSelected ? (speciesSelected === 'twilek' ? "Twi'Lek" : speciesSelected.replace('_', ' ')) : 'Species:'}
        </div>

        {/* Dropdown list */}
        {open && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: '300px',
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
                  handleSpeciesChange(item);
                  setOpen(false);
                }}
                style={{
                  padding: '6px 8px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
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
    </Container>
  );
}

export default CustomSpeciesDropdown;
