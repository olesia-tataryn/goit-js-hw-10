import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('.form-submit');
const form = document.querySelector('form');
const delayInput = document.querySelector('.delay-input');

button.addEventListener('click', () => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const selectedBtn = document.querySelector('input[name="state"]:checked');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!selectedBtn) {
        iziToast.warning({
          title: 'Causion',
          message: 'You forgot important data',
          position: 'topRight',
          backgroundColor: '#ffa000',
          messageColor: '#fff',
          titleColor: '#fff',
        });
        return;
      }
      if (selectedBtn.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59a10d',
        messageColor: '#fff',
        titleColor: '#fff',
      });
      form.reset();
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        titleColor: '#fff',
      });
      form.reset();
    });
});
