/* ************************************************************************
*  <copyright file="app.js" hyting>
*  Copyright (c) 2010, 2016 All Right Reserved, http://www.yantinghu.com
*
*  THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
*  KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
*  IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
*  PARTICULAR PURPOSE.
*  </copyright>
*  ***********************************************************************/

require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

require('../core/$core.scss');
require('./app.scss');

const stepTime = {
    step1: 7.339403,
    step2: 23.422449,
    step3: 36.217519
};
let expectStep = '';
let currentStep = '';

// const videoReady = video => video.buffered.end && video.buffered.end(0) == video.duration ? video.readyState : setTimeout(videoReady(video), 1000);

$(document).ready(async () => {
    try {
        const video = document.getElementById('h5_video');
        if (!video) {
            throw new Error('无法获取video');
        }
        $('.step').hide();
        video.controls = false; // 隐藏控制按钮
        // videoReady(video) && $('loading').hide();
        video.play(); // 开始播放
        currentStep = 'step1';
        expectStep = 'step1';
        $(video).on('timeupdate', () => {
            const vTime = video.currentTime;
            if (vTime >= stepTime[currentStep]) {
                if (currentStep != expectStep) {
                    currentStep = expectStep;
                    video.currentTime = stepTime[currentStep];
                    return $(video).trigger('timeupdate');
                }
                video.pause();
                $(`.${ currentStep }`).show();
            }
        });
        $('#startNIO').on('click', (event) => {
            currentStep = 'step2';
            expectStep = 'step2';
            video.play();
        });
        let dTime;
        $('#pushNIO').on('mousedown', (event) => {
            dTime = new Date();
        }).on('mouseup', (event) => {
            const xTime = new Date() - dTime;
            if (xTime < 3000) {
                expectStep = 'step1';
                $(video).trigger('timeupdate');
                return video.play();
            }
            debugger
            currentStep = 'step3';
            expectStep = 'step3';
            video.play();
        });
        $('#comeNIO').on('click', (event) => {
            currentStep = 'step4';
            expectStep = 'step4';
            video.play();
        });
    } catch (e) {
        console.error(e.message);
    }
});
