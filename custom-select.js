const customSelectLabel = document.querySelectorAll('.custom-select__head');
const customOptionsList = document.querySelector('.custom-options-list');
const customOptions = document.querySelectorAll('.custom-option');
const customOption = document.querySelector('.custom-option');

let customOptionHeight = 0;
let customListHeight = 0;

let currentLabel = '';
let currentOption = '';
let currentOptions = [];
let currentOptionsList = '';

/* use function below if need display selected option into head block immediately */

/*window.addEventListener('load', () => {
  [...customSelectLabel].forEach((label) => {
    let list = label.closest('.custom-select').querySelectorAll('.custom-option');
    getOptionValue(list, label);
  })
});*/

/*  click out of select head close options list  */
window.addEventListener('click', (e) => {

  if (!e.target.classList.contains('custom-select__head')) {
    getOptionsListCollapse(currentOptionsList);
  }
});

/* mange behavior select from keyboard */
[...customSelectLabel].forEach((label) => {

  label.addEventListener('focus', (e) => {

  [...customSelectLabel].forEach((item) => {

    getOptionsListCollapse(item.closest('.custom-select').querySelector('.custom-options-list'));
  
  });


    let options = label.closest('.custom-select').querySelectorAll('.custom-option');
    let option = label.closest('.custom-select').querySelector('.custom-option');
    let optionsList = label.closest('.custom-select').querySelector('.custom-options-list');

    currentOption = option;
    currentOptions = options;
    currentOptionsList = optionsList;
    currentLabel = label;

    e.target.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {

        defineOptionsListDimensions(option, optionsList);
        getOptionsListExpand(options, optionsList);
      }

      if (event.key === 'Escape') {
        getOptionsListCollapse(optionsList);
      }
    })
  })
});

/* select option of list through keyboard */
[...customOptions].forEach((elem) => {
  elem.addEventListener('focus', (e) => {

    e.target.addEventListener('keyup', (event) => {

      if (event.key === 'Enter') {

        [...currentOptions].forEach((opt) => {
          opt.classList.remove('selected')
        })

        event.target.classList.add('selected');

        if (currentOptionsList.classList.contains('expanded')) {
          getOptionValue(currentOptions, currentLabel);
        }

        getOptionsListCollapse(currentOptionsList);
      }

      if (event.key === 'Escape') {
        getOptionsListCollapse(currentOptionsList);
      }
    })
  })
});

/* manage behavior selecn with mouse */
[...customSelectLabel].forEach((label) => {

  label.addEventListener('click', () => {
   
    [...customSelectLabel].forEach((item) => {

      getOptionsListCollapse(item.closest('.custom-select').querySelector('.custom-options-list'));
    
    });

    let options = label.closest('.custom-select').querySelectorAll('.custom-option');
    let option = label.closest('.custom-select').querySelector('.custom-option');
    let optionsList = label.closest('.custom-select').querySelector('.custom-options-list');

    currentOption = option;
    currentOptions = options;
    currentOptionsList = optionsList;
    currentLabel = label;

    defineOptionsListDimensions(option, optionsList);
   
    if (customListHeight < 5) {
      getOptionsListExpand(options, optionsList);
    }

    if (customListHeight >= 5) {
      getOptionsListCollapse(optionsList);
    }
  });
});

/* select option of list with mouse */
[...customOptions].forEach((elem) => {
  elem.addEventListener('click', () => {

    [...currentOptions].forEach((opt) => {
      opt.classList.remove('selected')
    })

    elem.classList.add('selected');

    getOptionValue(currentOptions, currentLabel);
  })
});

/* display option value into select head block */
function getOptionValue(options, label) {
  [...options].find((item) => {
    if (item.classList.contains('selected')) {

      label.innerHTML = item.innerHTML;
    }
  })
};

/* calculate height of options list*/
function defineOptionsListDimensions(option, optionsList) {
  customOptionHeight = option.getBoundingClientRect().height;
  customListHeight = optionsList.getBoundingClientRect().height;
}

/* expand list of options  */
function getOptionsListExpand(options, optionsList) {
  optionsList.style.height = customOptionHeight * options.length + 'px';
  optionsList.classList.add('expanded');
}

/* collapse list of options */
function getOptionsListCollapse(optionsList) {
  optionsList.style.height = 0;
  optionsList.classList.remove('expanded');
}

