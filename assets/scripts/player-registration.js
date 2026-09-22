(function () {
  'use strict';

  var form = document.getElementById('playerRegistrationForm');
  if (!form) return;

  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-form-step]'));
  var indicators = Array.prototype.slice.call(document.querySelectorAll('[data-step-indicator]'));
  var progressBar = document.getElementById('progressBar');
  var progressPercent = document.getElementById('progressPercent');
  var review = document.getElementById('registrationReview');
  var reviewSummary = document.getElementById('reviewSummary');
  var success = document.getElementById('registrationSuccess');
  var editButton = document.getElementById('editRegistration');
  var confirmButton = document.getElementById('confirmRegistration');
  var reference = document.getElementById('registrationReference');
  var currentStep = 1;
  var maxFileSize = 5 * 1024 * 1024;

  var dob = document.getElementById('dob');
  if (dob) dob.max = new Date().toISOString().split('T')[0];

  function scrollToWorkspace() {
    var workspace = document.querySelector('.registration-workspace');
    if (workspace) workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setStep(step, shouldScroll) {
    currentStep = Math.max(1, Math.min(4, step));
    review.hidden = true;
    success.hidden = true;
    form.hidden = false;

    panels.forEach(function (panel) {
      panel.hidden = Number(panel.getAttribute('data-form-step')) !== currentStep;
    });

    indicators.forEach(function (indicator) {
      var number = Number(indicator.getAttribute('data-step-indicator'));
      indicator.classList.toggle('active', number === currentStep);
      indicator.classList.toggle('completed', number < currentStep);
      if (number === currentStep) indicator.setAttribute('aria-current', 'step');
      else indicator.removeAttribute('aria-current');
    });

    var percentage = currentStep * 25;
    progressBar.style.width = percentage + '%';
    progressPercent.textContent = percentage + '%';

    panels[currentStep - 1].setAttribute('tabindex', '-1');
    panels[currentStep - 1].focus({ preventScroll: true });
    if (shouldScroll) scrollToWorkspace();
  }

  function isValidFile(input) {
    if (!input.required && !input.files.length) return true;
    if (!input.files.length) return false;
    var file = input.files[0];
    var acceptedTypes = input.accept.split(',').map(function (type) { return type.trim(); });
    return file.size <= maxFileSize && acceptedTypes.indexOf(file.type) !== -1;
  }

  function validateField(input) {
    var wrapper = input.closest('.field');
    var valid = input.type === 'file' ? isValidFile(input) : input.checkValidity();
    if (wrapper) wrapper.classList.toggle('invalid', !valid);
    input.setAttribute('aria-invalid', valid ? 'false' : 'true');
    return valid;
  }

  function validatePanel(panel) {
    var firstInvalid = null;
    panel.querySelectorAll('[required]').forEach(function (input) {
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  }

  form.querySelectorAll('[required]').forEach(function (input) {
    input.addEventListener('blur', function () { validateField(input); });
    input.addEventListener('input', function () {
      var wrapper = input.closest('.field');
      if (wrapper && wrapper.classList.contains('invalid')) validateField(input);
    });
    input.addEventListener('change', function () { validateField(input); });
  });

  form.querySelectorAll('input[type="file"]').forEach(function (input) {
    input.addEventListener('change', function () {
      var file = input.files[0];
      var wrapper = input.closest('.upload-field');
      var label = document.querySelector('[data-file-name="' + input.id + '"]');
      if (label) label.textContent = file ? file.name : 'No file selected';
      if (wrapper) wrapper.classList.toggle('has-file', Boolean(file) && isValidFile(input));
      validateField(input);
    });
  });

  document.querySelectorAll('.next-step').forEach(function (button) {
    button.addEventListener('click', function () {
      var panel = panels[currentStep - 1];
      if (validatePanel(panel)) setStep(currentStep + 1, true);
    });
  });

  document.querySelectorAll('.prev-step').forEach(function (button) {
    button.addEventListener('click', function () { setStep(currentStep - 1, true); });
  });

  function fieldValue(id) {
    var input = document.getElementById(id);
    if (!input) return '';
    if (input.type === 'file') return input.files.length ? input.files[0].name : '';
    return input.value.trim();
  }

  function addReviewItem(label, value) {
    if (!value) return;
    var item = document.createElement('div');
    var small = document.createElement('small');
    var strong = document.createElement('strong');
    item.className = 'review-item';
    small.textContent = label;
    strong.textContent = value;
    item.appendChild(small);
    item.appendChild(strong);
    reviewSummary.appendChild(item);
  }

  function showReview() {
    reviewSummary.replaceChildren();
    addReviewItem('Applicant', fieldValue('fullName'));
    addReviewItem('Parent or guardian', fieldValue('guardianName'));
    addReviewItem('Email', fieldValue('email'));
    addReviewItem('Mobile', fieldValue('mobile'));
    addReviewItem('Date of birth', fieldValue('dob'));
    addReviewItem('Gender', fieldValue('gender'));
    addReviewItem('City and state', fieldValue('city') + ', ' + fieldValue('state'));
    addReviewItem('Preferred trial city', fieldValue('trialCity'));
    addReviewItem('Primary category', fieldValue('playerCategory'));
    addReviewItem('Batting style', fieldValue('battingStyle'));
    addReviewItem('Bowling profile', [fieldValue('bowlingArm'), fieldValue('bowlingStyle')].filter(Boolean).join(' · ') || 'Not specified');
    addReviewItem('Experience', fieldValue('experience'));
    addReviewItem('Institution, team or club', fieldValue('institution') || 'Not specified');
    addReviewItem('Profile photo', fieldValue('profilePhoto'));
    addReviewItem('Identity document', fieldValue('identityDocument'));
    form.hidden = true;
    review.hidden = false;
    success.hidden = true;
    progressBar.style.width = '100%';
    progressPercent.textContent = 'Review';
    review.setAttribute('tabindex', '-1');
    review.focus();
    scrollToWorkspace();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (currentStep < 4) {
      if (validatePanel(panels[currentStep - 1])) setStep(currentStep + 1, true);
      return;
    }
    if (validatePanel(panels[3])) showReview();
  });

  editButton.addEventListener('click', function () { setStep(1, true); });

  confirmButton.addEventListener('click', function () {
    var stamp = Date.now().toString().slice(-6);
    reference.textContent = 'S50-' + stamp;
    form.hidden = true;
    review.hidden = true;
    success.hidden = false;
    progressBar.style.width = '100%';
    progressPercent.textContent = 'Complete';
    indicators.forEach(function (indicator) {
      indicator.classList.remove('active');
      indicator.classList.add('completed');
      indicator.removeAttribute('aria-current');
    });
    success.focus();
    scrollToWorkspace();
  });

  setStep(1, false);
}());
