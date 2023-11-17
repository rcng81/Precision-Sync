import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faExchangeAlt, faCopy, faCaretDown, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './Converter.css';



const Converter = () => {
  const [fromGame, setFromGame] = useState('');
  const [toGame, setToGame] = useState('');
  const [sensitivity, setSensitivity] = useState('');
  const [convertedSensitivity, setConvertedSensitivity] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [copyTooltip, setCopyTooltip] = useState('Copy');
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [fromGameSelectedOption, setFromGameSelectedOption] = useState(null);
  const [toGameSelectedOption, setToGameSelectedOption] = useState(null);
  const [themeTooltip, setThemeTooltip] = useState('Switch to Light Mode'); // New state for tooltip text


  // Define and sort a list of games for the dropdown
  const games = [
    'Counter-Strike 2',
    'Overwatch 2',
    'Fortnite',
    'Apex Legends',
    'Valorant',
    'AimLabs',
    'Call of Duty: Warzone',
    'Escape from Tarkov',
    'Rust',
    'Tom Clancy\'s Rainbow Six Siege',
    'osu!',
    'DayZ',
    'Destiny 2',
    'Krunker',
    'Halo',
    'PUBG',
    'Squad',
    'Team Fortress 2',
    'Roblox',
    // ...add more games as needed
  ].sort(); // This sorts the array alphabetically

  const renderGameOptions = () => {
    return games.map((game, index) => <option key={index} value={game} />);
  };

  const gameOptions = games.map(game => ({ value: game, label: game }));

  const CustomInput = props => {
    return (
      <components.Input
        {...props}
        innerProps={{
          ...props.innerProps,
          style: { caretColor: "white" }
        }}
      />
    );
  };

  const customStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: theme === 'dark' ? 'var(--input-color)' : 'var(--light-input-color)',
      borderColor: isFocused ? 'var(--highlight-color)' : 'var(--input-border-color)',
      boxShadow: isFocused ? `0 0 0 1px var(--highlight-color)` : 'none',
      '&:hover': {
        borderColor: 'var(--input-border-hover-color)',
      },
      color: theme === 'dark' ? 'var(--text-color)' : 'var(--light-text-color)',
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: 'transform 0.2s',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
    }),
    input: (styles) => ({
      ...styles,
    color: theme === 'dark' ? 'var(--text-color)' : 'var(--light-text-color)', // or any other color
    '::placeholder': {
      color: theme === 'dark' ? 'var(--text-color)' : 'var(--light-text-color)', // or any other color
    },
    'input': {
      '&, &:focus': {
        caretColor: theme === 'dark' ? 'white' : 'black',
      }
    },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: theme === 'dark' ? 'var(--menu-background-color-dark)' : 'var(--menu-background-color-light)',
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? 'var(--selected-option-bg-color)'
        : isFocused
        ? 'var(--focused-option-bg-color)'
        : 'transparent',
      color: isSelected || isFocused
        ? 'var(--selected-focused-option-text-color)'
        : theme === 'dark'
        ? 'var(--option-text-color-dark)'
        : 'var(--option-text-color-light)',
    }),
    placeholder: (styles, { isFocused }) => ({
      ...styles,
      // Hide the placeholder when the select is focused
      color: isFocused ? 'transparent' : theme === 'dark' ? 'var(--text-color)' : 'var(--light-text-color)',
      // You can also hide the placeholder when a value is selected by using the state (e.g., `selectedOption`)
    }),
    singleValue: (styles, { isFocused }) => ({
      ...styles,
      color: theme === 'dark' ? 'var(--text-color)' : 'var(--light-text-color)',
      // Hide the single value when the select is focused to mimic the placeholder behavior
      display: isFocused ? 'none' : 'block',
    }),
    // Add other custom styles if needed
  };
  
  // Dropdown change handlers
  const handleFromGameChange = (event) => {
    setFromGame(event.target.value);
  };

  const handleToGameChange = (event) => {
    setToGame(event.target.value);
  };

  // Sensitivity input change handler
  const handleSensitivityChange = (event) => {
    setSensitivity(event.target.value);
  };

  const swapGames = () => {
    // Swap the selected options for the Select components
    const newFromGameSelectedOption = toGameSelectedOption;
    const newToGameSelectedOption = fromGameSelectedOption;

    setFromGameSelectedOption(newFromGameSelectedOption);
    setToGameSelectedOption(newToGameSelectedOption);

    // Swap the values
    setFromGame(newFromGameSelectedOption ? newFromGameSelectedOption.value : '');
    setToGame(newToGameSelectedOption ? newToGameSelectedOption.value : '');

    // Swap the sensitivities
    setSensitivity(convertedSensitivity);
    setConvertedSensitivity(sensitivity);
  };

  // Resetting the form
  const refreshForm = () => {
    setFromGame('');
    setToGame('');
    setSensitivity('');
    setConvertedSensitivity('');
    setFromGameSelectedOption(null); // Reset the from game select
    setToGameSelectedOption(null); // Reset the to game select
  };
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(convertedSensitivity).then(() => {

      navigator.clipboard.writeText(convertedSensitivity)
      .then(() => {
        setCopyTooltip('Copied to clipboard'); // Update tooltip text on successful copy
      })
      .catch(() => {
        setCopyTooltip('Failed to copy!'); // You can handle copy failure here
      });
      setCopyTooltip('Copied to clipboard');
      setShowCopyTooltip(true); // Show tooltip
      setTimeout(() => {
        setCopyTooltip('Copy');
        setShowCopyTooltip(false); // Hide tooltip after some time
      }, 2000);
    }, () => {
      setCopyTooltip('Failed to copy!');
      setShowCopyTooltip(true); // Show tooltip on failure as well
      setTimeout(() => {
        setShowCopyTooltip(false); // Hide tooltip after some time
      }, 2000);
    });
  };

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon
          icon={faCaretDown}
          style={{ transform: props.selectProps.menuIsOpen ? 'rotate(180deg)' : null }}
        />
      </components.DropdownIndicator>
    );
  };

  const resetTooltipText = () => {
    setCopyTooltip('Copy'); // Reset tooltip text
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  useEffect(() => {
    convertSensitivity();
}, [fromGame, toGame, sensitivity]);

  const conversionFactors = {
    'Counter-Strike 2': {
      'Overwatch 2': 3.33,
      'Fortnite': 3.960396,
      'Apex Legends': 1,
      'Valorant': 0.314286,
      'AimLabs': 0.44,
      'Call of Duty: Warzone': 3.333333,
      'Escape from Tarkov': 0.176,
      'Rust': 0.195556,
      'Tom Clancy\'s Rainbow Six Siege': 3.839724,
      'osu!': 0.276,
      'DayZ': 0.1232,
      'Destiny 2': 3.333333,
      'Krunker': 0.159989,
      'Halo': 0.99,
      'PUBG': 32.174805,
      'Squad': 0.125727,
      'Team Fortress 2': 1,
      'Roblox': 0.054756,
    },
    'Overwatch 2': {
      'Counter-Strike 2': 0.3,
      'Fortnite': 1.188119,
      'Apex Legends': 0.3,
      'Valorant': 0.094286,
      'AimLabs': 0.132,
      'Call of Duty: Warzone': 1,
      'Escape from Tarkov': 0.0528,
      'Rust': 0.058667,
      'Tom Clancy\'s Rainbow Six Siege': 1.151917,
      'osu!': 0.083,
      'DayZ': 0.03696,
      'Destiny 2': 1,
      'Krunker': 0.047997,
      'Halo': 0.297,
      'PUBG': 6.030868,
      'Squad': 0.037718,
      'Team Fortress 2': 0.3,
      'Roblox': 0.016427,
    },
    'Fortnite': {
      'Counter-Strike 2': 0.2525,
      'Overwatch 2': 0.841667,
      'Apex Legends': 0.2525,
      'Valorant': 0.079357,
      'AimLabs': 0.1111,
      'Call of Duty: Warzone': 0.841667,
      'Escape from Tarkov': 0.04444,
      'Rust': 0.0493775,
      'Tom Clancy\'s Rainbow Six Siege': 0.96953,
      'osu!': 0.070,
      'DayZ': 0.031108,
      'Destiny 2': 0.841667,
      'Krunker': 0.040397,
      'Halo': 0.249975,
      'PUBG': 2.287875,
      'Squad': 0.031746,
      'Team Fortress 2': 0.2525,
      'Roblox': 0.013826,
    },
    'Apex Legends': {
      'Counter-Strike 2': 1,
      'Overwatch 2': 3.333333,
      'Fortnite': 3.960396,
      'Valorant': 0.314286,
      'AimLabs': 0.44,
      'Call of Duty: Warzone': 3.333333,
      'Escape from Tarkov': 0.176,
      'Rust': 0.1955,
      'Tom Clancy\'s Rainbow Six Siege': 3.839724,
      'osu!': 0.2765,
      'DayZ': 0.1232,
      'Destiny 2': 3.333333,
      'Krunker': 0.159989,
      'Halo': 0.99,
      'PUBG': 32.174805,
      'Squad': 0.125727,
      'Team Fortress 2': 1,
      'Roblox': 0.054756,
    },
    'Valorant': {
      'Counter-Strike 2': 3.181818,
      'Overwatch 2': 10.606061,
      'Fortnite': 12.60126,
      'Apex Legends': 3.181818,
      'AimLabs': 1.4,
      'Call of Duty: Warzone': 10.606061,
      'Escape from Tarkov': 0.56,
      'Rust': 0.622222,
      'Tom Clancy\'s Rainbow Six Siege': 12.217305,
      'osu!': 0.879,
      'DayZ': 0.392,
      'Destiny 2': 10.606061,
      'Krunker': 0.509056,
      'Halo': 3.15,
      'PUBG': 57.308573,
      'Squad': 0.40004,
      'Team Fortress 2': 3.181818,
      'Roblox': 0.174222,
    },
    'AimLabs': {
      'Counter-Strike 2': 2.272727,
      'Overwatch 2': 7.575758,
      'Fortnite': 9.0009,
      'Apex Legends': 2.272727,
      'Valorant': 0.714286,
      'Call of Duty: Warzone': 7.575758,
      'Escape from Tarkov': 0.4,
      'Rust': 0.444444,
      'Tom Clancy\'s Rainbow Six Siege': 8.726646,
      'osu!': 0.628,
      'DayZ': 0.28,
      'Destiny 2': 7.575758,
      'Krunker': 0.363611,
      'Halo': 2.25,
      'PUBG': 50.002172,
      'Squad': 0.285743,
      'Team Fortress 2': 2.272727,
      'Roblox': 0.124444,
    },
    'Call of Duty: Warzone': {
      'Counter-Strike 2': 0.3,
      'Overwatch 2': 1,
      'Fortnite': 1.188119,
      'Apex Legends': 0.3,
      'Valorant': 0.094286,
      'AimLabs': 0.132,
      'Escape from Tarkov': 0.0528,
      'Rust': 0.058667,
      'Tom Clancy\'s Rainbow Six Siege': 1.151917,
      'osu!': 0.083,
      'DayZ': 0.03696,
      'Destiny 2': 1,
      'Krunker': 0.047997,
      'Halo': 0.297,
      'PUBG': 6.030868,
      'Squad': 0.037718,
      'Team Fortress 2': 0.3,
      'Roblox': 0.016427,
    },
    'Escape from Tarkov': {
      'Counter-Strike 2': 5.681818,
      'Overwatch 2': 18.939394,
      'Fortnite': 22.50225,
      'Apex Legends': 5.681818,
      'Valorant': 1.785714,
      'AimLabs': 2.5,
      'Call of Duty: Warzone': 18.939394,
      'Rust': 1.111111,
      'Tom Clancy\'s Rainbow Six Siege': 21.816616,
      'osu!': 1.570,
      'DayZ': 0.7,
      'Destiny 2': 18.939394,
      'Krunker': 0.909028,
      'Halo': 5.625,
      'PUBG': 69.899172,
      'Squad': 0.714357,
      'Team Fortress 2': 5.681818,
      'Roblox': 0.311111,
    },
    'Rust':{
      'Counter-Strike 2': 5.113636,
      'Overwatch 2': 17.045455,
      'Fortnite': 20.252025,
      'Apex Legends': 5.113636,
      'Valorant': 1.607143,
      'AimLabs': 2.25,
      'Call of Duty: Warzone': 17.045455,
      'Escape from Tarkov': 0.9,
      'Tom Clancy\'s Rainbow Six Siege': 19.634954,
      'osu!': 1.413,
      'DayZ': 0.63,
      'Destiny 2': 17.045455,
      'Krunker': 0.818125,
      'Halo': 5.0625,
      'PUBG': 67.611297,
      'Squad': 0.642921,
      'Team Fortress 2': 5.113636,
      'Roblox': 0.28,
    },
    'Tom Clancy\'s Rainbow Six Siege':{
      'Counter-Strike 2': 0.260435,
      'Overwatch 2': 0.868118,
      'Fortnite': 1.031427,
      'Apex Legends': 0.260435,
      'Valorant': 0.081851,
      'AimLabs': 0.114592,
      'Call of Duty: Warzone': 0.868118,
      'Escape from Tarkov': 0.045837,
      'Rust': 0.05093,
      'osu!': 0.072,
      'DayZ': 0.032086,
      'Destiny 2': 0.868118,
      'Krunker': 0.041667,
      'Halo': 0.255,
      'PUBG': 2.959803,
      'Squad': 0.032744,
      'Team Fortress 2': 0.260435,
      'Roblox': 0.01426,
    },
    'osu!':{
      'Counter-Strike 2': 3.618,
      'Overwatch 2': 12.061,
      'Fortnite': 14.329,
      'Apex Legends': 3.618,
      'Valorant': 1.137,
      'AimLabs': 1.592,
      'Call of Duty: Warzone': 12.061,
      'Escape from Tarkov': 0.637,
      'Rust': 0.708,
      'Tom Clancy\'s Rainbow Six Siege': 13.893,
      'DayZ': 0.446,
      'Destiny 2': 12.061,
      'Krunker': 0.5797,
      'Halo': 3.538,
      'PUBG': 68.1035,
      'Squad': 0.455,
      'Team Fortress 2': 3.618,
      'Roblox': 0.200,
    },
    'DayZ':{
      'Counter-Strike 2': 8.117,
      'Overwatch 2': 27.056,
      'Fortnite': 32.146,
      'Apex Legends': 8.116883,
      'Valorant': 2.551,
      'AimLabs': 3.571429,
      'Call of Duty: Warzone': 27.056,
      'Escape from Tarkov': 1.429,
      'Rust': 1.587,
      'Tom Clancy\'s Rainbow Six Siege': 31.167,
      'osu!': 2.243,
      'Destiny 2': 27.056277,
      'Krunker': 1.298611,
      'Halo': 8.035714,
      'PUBG': 77.64427,
      'Squad': 1.02051,
      'Team Fortress 2': 8.116883,
      'Roblox': 0.444444,
    },
    'Destiny 2': {
      'Counter-Strike 2': 0.3,
      'Overwatch 2': 1,
      'Fortnite': 1.188119,
      'Apex Legends': 0.3,
      'Valorant': 0.094286,
      'AimLabs': 0.132,
      'Call of Duty: Warzone': 1,
      'Escape from Tarkov': 0.0528,
      'Rust': 0.058667,
      'Tom Clancy\'s Rainbow Six Siege': 1.151917,
      'osu!': 0.083,
      'DayZ': 0.03696,
      'Krunker': 0.047997,
      'Halo': 0.297,
      'PUBG': 6.030868,
      'Squad': 0.037718,
      'Team Fortress 2': 0.3,
      'Roblox': 0.016427,
    },
    'Krunker': {
      'Counter-Strike 2': 6.250434,
      'Overwatch 2': 20.83478,
      'Fortnite': 24.754194,
      'Apex Legends': 6.250434,
      'Valorant': 1.964422,
      'AimLabs': 2.750191,
      'Call of Duty: Warzone': 20.83478,
      'Escape from Tarkov': 1.100076,
      'Rust': 1.222307,
      'Tom Clancy\'s Rainbow Six Siege': 23.999944,
      'osu!': 1.7250,
      'DayZ': 0.770053,
      'Destiny 2': 20.83478,
      'Halo': 6.18793,
      'PUBG': 71.970314,
      'Squad': 0.785847,
      'Team Fortress 2': 6.250434,
      'Roblox': 0.342246,
    },
    'Halo': {
      'Counter-Strike 2': 1.010101,
      'Overwatch 2': 3.367003,
      'Fortnite': 4.0004,
      'Apex Legends': 1.010101,
      'Valorant': 0.31746,
      'AimLabs': 0.444444,
      'Call of Duty: Warzone': 3.367003,
      'Escape from Tarkov': 0.177778,
      'Rust': 0.197531,
      'Tom Clancy\'s Rainbow Six Siege': 3.878509,
      'osu!': 0.283,
      'DayZ': 0.124444,
      'Destiny 2': 3.367003,
      'Krunker': 0.161605,
      'PUBG': 32.393046,
      'Squad': 0.126997,
      'Team Fortress 2': 1.010101,
      'Roblox': 0.055309,
    },
    'PUBG': {
      'Counter-Strike 2': 0.03108021944,
      'Overwatch 2': 0.16581361091,
      'Fortnite': 0.43708681636,
      'Apex Legends': 0.03108021944,
      'Valorant': 0.01744939627,
      'AimLabs': 0.01999913123,
      'Call of Duty: Warzone': 0.16581361091,
      'Escape from Tarkov': 0.01430632111,
      'Rust': 0.0147904277,
      'Tom Clancy\'s Rainbow Six Siege': 0.33786032381,
      'osu!': 0.01468353315,
      'DayZ': 0.01287925045,
      'Destiny 2': 0.16581361091,
      'Krunker': 0.01389461771,
      'Halo': 0.03087082332,
      'Squad': 0.029918,
      'Team Fortress 2': 0.23796,
      'Roblox': 0.01303,
    },
    'Squad': {
      'Counter-Strike 2': 7.9537410421,
      'Overwatch 2': 26.5125404316,
      'Fortnite': 31.5000315,
      'Apex Legends': 7.9537410421,
      'Valorant': 2.499750025,
      'AimLabs': 3.49964828535,
      'Call of Duty: Warzone': 26.5125404316,
      'Escape from Tarkov': 1.39986029394,
      'Rust': 1.55540105238,
      'Tom Clancy\'s Rainbow Six Siege': 30.5399462497,
      'osu!': 2.1978021978,
      'DayZ': 0.97990220576,
      'Destiny 2': 26.5125404316,
      'Krunker': 1.27251233383,
      'Halo': 7.8742017528,
      'PUBG': 33.424694164,
      'Team Fortress 2': 7.95375,
      'Roblox': 0.435512,
    },
    'Team Fortress 2': {
      'Counter-Strike 2': 1,
      'Overwatch 2': 3.33333333333,
      'Fortnite': 3.9603960396,
      'Apex Legends': 1,
      'Valorant': 0.31428573224,
      'AimLabs': 0.4400000528,
      'Call of Duty: Warzone': 3.33333333333,
      'Escape from Tarkov': 0.17600000563,
      'Rust': 0.19555556946,
      'Tom Clancy\'s Rainbow Six Siege': 3.83972968303,
      'osu!': 0.27639579878,
      'DayZ': 0.12320000177,
      'Destiny 2': 3.33333333333,
      'Krunker': 0.15998889037,
      'Halo': 0.9900000099,
      'PUBG': 4.20238695579,
      'Squad': 0.1257268584,
      'Roblox': 0.054756,
    },
    'Roblox': {
      'Counter-Strike 2': 18.2628387757,
      'Overwatch 2': 60.8753880806,
      'Fortnite': 72.3274989151,
      'Apex Legends': 18.2628387757,
      'Valorant': 5.73980323954,
      'AimLabs': 8.0357429848,
      'Call of Duty: Warzone': 60.8753880806,
      'Escape from Tarkov': 3.21428686225,
      'Rust': 3.57142857143,
      'Tom Clancy\'s Rainbow Six Siege': 70.126227209,
      'osu!': 5,
      'DayZ': 2.25000225,
      'Destiny 2': 60.8753880806,
      'Krunker': 2.92187490869,
      'Halo': 18.0802401056,
      'PUBG': 76.7459708365,
      'Squad': 2.29614798215,
      'Team Fortress 2': 18.2628387757,
    }
  }

  const convertSensitivity = () => {
    // Check if both games are selected and a valid sensitivity is entered
    if (fromGame && toGame && sensitivity) {
      // Check if the selected games are the same
      if (fromGame === toGame) {
        // If the same game is selected, the sensitivity remains the same
        setConvertedSensitivity(sensitivity);
      } else {
        // Find the conversion factor for the selected games
        const factor = conversionFactors[fromGame]?.[toGame];
        if (factor) {
          // Calculate the new sensitivity
          const newSensitivity = (sensitivity * factor).toFixed(2); // Limit to two decimal places
          // Set the new sensitivity to the state to display it
          setConvertedSensitivity(newSensitivity);
        } else {
          // If no conversion factor is found, handle the error appropriately
          setConvertedSensitivity('Conversion not available.');
        }
      }
    } else {
      // If input is not valid, set an error message or handle accordingly
      setConvertedSensitivity('Please select both games and enter your sensitivity.');
    }
  };
  
  

  /* ... (rest of the existing React component) ... */

  return (
    <>
    <header className="header">
        <div className="header-content">
          <FontAwesomeIcon icon={faBullseye} className="header-icon" />
          <h1 className="header-title">Precision Sync</h1>
          <div className="header-divider"></div>
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} onClick={toggleTheme} className="theme-icon" />
        </div>
      </header>
  <div className ="main-content">
    <div className="converter-container">
      <h1>Convert Your Sensitivity</h1>
      <div className="conversion-section">
      <div className="from-section">
  <label htmlFor="from-game">Convert from</label>
  <Select
  className="select-rectangle"
  classNamePrefix="select"
  styles={customStyles}
  components={{ Input: CustomInput }}
  options={gameOptions}
  value={fromGameSelectedOption} // Control the value with fromGameSelectedOption
  onChange={selectedOption => {
    setFromGame(selectedOption.value);
    setFromGameSelectedOption(selectedOption); // Update the fromGameSelectedOption state
  }}
  placeholder="Select Game"
/>
          <datalist id="games-list">
            {renderGameOptions()}
          </datalist>
          <input
            type="number"
            value={sensitivity}
            onChange={handleSensitivityChange}
            placeholder="Enter your sensitivity"
            className="input-rectangle"
          />
        </div>
        <div className="tooltip">
          <FontAwesomeIcon icon={faExchangeAlt} onClick={swapGames} />
          <span className="tooltiptext">Swap</span>
        </div>
        <div className="to-section">
  <label htmlFor="to-game">Convert to</label>
  <Select
  className="select-rectangle"
  classNamePrefix="select"
  styles={customStyles}
  components={{ Input: CustomInput }}
  options={gameOptions}
  value={toGameSelectedOption} // Control the value with toGameSelectedOption
  onChange={selectedOption => {
    setToGame(selectedOption.value);
    setToGameSelectedOption(selectedOption); // Update the toGameSelectedOption state
  }}
  placeholder="Select Game"/>

        <div className="converter-result input-rectangle">
          <span>{convertedSensitivity}</span>
          <div className="tooltip" onMouseLeave={() => setShowCopyTooltip(false)}>
            <FontAwesomeIcon icon={faCopy} onClick={copyToClipboard} className="copy-icon" />
            <span className="tooltiptext">Copy</span>
            {showCopyTooltip && <span className="tooltiptext">{copyTooltip}</span>}
          </div>
        </div>
      </div>
      </div>
      <div className="tooltip">
        <FontAwesomeIcon icon={faSyncAlt} onClick={refreshForm} />
        <span className="tooltiptext">Refresh</span>
      </div>
      {copySuccess && <div className="copy-feedback">{copySuccess}</div>}
    </div>
    </div>
    </>
  );
};

export default Converter; 