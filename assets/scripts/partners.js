(function () {
  'use strict';

  var form = document.getElementById('partnerForm');
  var success = document.getElementById('partnerSuccess');
  var interest = document.getElementById('partnershipInterest');
  var newEnquiry = document.getElementById('newEnquiry');
  var ctas = document.querySelectorAll('.js-partner-cta');

  ctas.forEach(function (cta) {
    cta.addEventListener('click', function () {
      var value = cta.getAttribute('data-interest');
      if (value && interest) interest.value = value;
    });
  });

  function validateField(field) {
    var wrapper = field.closest('.field');
    var valid = field.checkValidity();
    if (wrapper) wrapper.classList.toggle('invalid', !valid);
    field.setAttribute('aria-invalid', valid ? 'false' : 'true');
    return valid;
  }

  if (form) {
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.closest('.field').classList.contains('invalid')) validateField(field);
      });
      field.addEventListener('change', function () {
        if (field.closest('.field').classList.contains('invalid')) validateField(field);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      form.hidden = true;
      success.hidden = false;
      success.setAttribute('tabindex', '-1');
      success.focus();
    });
  }

  if (newEnquiry) {
    newEnquiry.addEventListener('click', function () {
      form.reset();
      form.querySelectorAll('.invalid').forEach(function (field) { field.classList.remove('invalid'); });
      success.hidden = true;
      form.hidden = false;
      document.getElementById('partnerName').focus();
    });
  }
}());
