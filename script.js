let requestApi

document.addEventListener("DOMContentLoaded", (event) => {
  AP.require('request', (request) =>
    requestApi = request
  )
  
  eventAnimationFocusInputs()
});

function eventAnimationFocusInputs() {
  document.querySelectorAll('.easyClock-inputs > div')?.forEach((item) => {
    item?.querySelector('input')?.addEventListener('focus', (e) => {
      item?.classList?.add('selected')
    })

    item?.querySelector('input')?.addEventListener('focusout', (e) => {
      if (!e?.target?.value) {
        item?.classList?.remove('selected')
      }
    })
  })
}

function newInputs() {
  const elementMain = document.querySelector('.a-easyClock-inputs')
  const easyClockInput = document.createElement('div')
  const elementsNewInputs = `
      <input type="text" id="issueKey" name="issueKey" placeholder="Tarefa" required>
      <div class="easyClock-inputs__line"></div>
      <input type="text" id="timeSpent" name="timeSpent" placeholder="Tempo" required>
      <button class="easyClock-trash">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    `

  easyClockInput?.classList?.add('easyClock-inputs')
  easyClockInput.innerHTML = elementsNewInputs

  elementMain?.appendChild(easyClockInput)
}

function updateWorkLogTask(issueId) {
  if (!requestApi) {
    console.error('O módulo "request" ainda não foi carregado.');
    return;
  }

  const currentDate = new Date()
  // const newWorklog = {
  //   "timeSpent": "2h",
  //   "comment": "Tempo trabalhado atualizado",
  //   "started": new Date().toISOString().replace('Z', '+0000')
  // }
  const bodyData = `{
    "comment": {
      "content": [
        {
          "content": [
            {
              "text": "I did some work here.",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
    "started": "2021-01-17T12:34:00.000+0000",
    "timeSpentSeconds": 12000
  }`

  requestApi({
    url: `/rest/api/3/issue/KAN-1/worklog`,
    type: 'POST',
    contentType: 'application/json',
    data: bodyData,
    success: function(response) {
      console.log('Tempo trabalhado atualizado com sucesso:', response)
    },
    error: function(response) {
      console.log('Erro ao atualizar o tempo trabalhado:', response)
    }
  })
}
