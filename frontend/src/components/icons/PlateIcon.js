import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function PlateIcon(props) {
  const { ...rest } = props;
  return (
    <SvgIcon viewBox={'0 0 512 512'} width={24} height={24} {...rest}>
      <path
        d="M496.661,168.359c1.545-2.975,1.539-6.602-0.198-9.626c-1.239-2.157-3.189-3.708-5.42-4.481
        c-12.655-29.217-30.833-56.081-54.025-79.273C388.667,26.628,324.38,0,256,0S123.333,26.628,74.981,74.981S0,187.62,0,256
        c0,36.387,7.571,71.602,21.914,103.886c-4.983,5.535-7.711,12.619-7.711,20.124c0,8.045,3.133,15.608,8.821,21.296
        c5.872,5.872,13.584,8.806,21.296,8.806c2.238,0,4.474-0.255,6.668-0.75c7.273,9.69,15.274,18.937,23.993,27.656
        c12.403,12.403,25.872,23.35,40.174,32.81c-3.494,10.487-1.08,22.526,7.252,30.86c5.872,5.872,13.584,8.806,21.296,8.806
        c7.712,0,15.425-2.935,21.296-8.806l3.856-3.856C196.428,506.793,225.812,512,256,512c68.38,0,132.667-26.628,181.019-74.981
        C485.371,388.666,512,324.38,512,256C512,225.631,506.736,196.075,496.661,168.359z M20.078,256
        C20.078,125.913,125.912,20.078,256,20.078c15.249,0,30.153,1.485,44.601,4.267l-35.103,35.102
        c-3.927,0.345-7.569,0.788-9.498,0.788c-107.945,0-195.765,87.82-195.765,195.765c0,19.827,2.976,38.969,8.483,57.019
        l-31.413,31.413C26.212,317.106,20.078,287.259,20.078,256z M220.624,135.159l0.275,4.439c0.788,12.711-3.925,25.165-12.93,34.17
        L85.074,296.662c-3.107-13.056-4.761-26.668-4.761-40.662c0-92.917,72.51-169.205,163.915-175.283l-4.832,4.832
        C226.323,98.622,219.481,116.705,220.624,135.159z M37.221,387.108c-1.896-1.896-2.94-4.416-2.94-7.098
        c0-2.682,1.044-5.203,2.94-7.099l184.945-184.944c13.073-13.074,19.916-31.157,18.772-49.61l-0.275-4.439
        c-0.787-12.711,3.925-25.165,12.931-34.17L323.244,30.1c0.294-0.293,0.558-0.605,0.808-0.924l1.911,1.493
        c6.279,1.954,12.445,4.164,18.487,6.618L273.138,108.6c-3.92,3.92-3.92,10.277,0,14.198c1.96,1.96,4.53,2.94,7.099,2.94
        c2.569,0,5.139-0.981,7.099-2.94l74.774-74.774c0.591-0.591,1.082-1.243,1.495-1.928c6.277,3.232,12.387,6.741,18.324,10.504
        l-5.62,5.621c0,0,0,0-0.001,0l-74.774,74.774c-3.92,3.92-3.92,10.277,0,14.198c1.96,1.96,4.53,2.94,7.099,2.94
        c2.569,0,5.139-0.981,7.099-2.94l82.941-82.942c30.728,23.407,55.557,54.168,71.846,89.64l-28.726,7.562
        c-48.958,12.888-93.757,38.622-129.554,74.419l-41.008,41.009c-8.024,8.024-12.148,19.118-11.315,30.435
        c0.405,5.49-1.596,10.871-5.488,14.764l-83.531,83.53c-23.762-13.215-44.152-31.765-59.539-54.042l139.206-139.206
        c9.005-9.006,21.461-13.707,34.172-12.932l4.438,0.274c18.453,1.151,36.536-5.699,49.61-18.772l80.12-80.12
        c3.92-3.92,3.92-10.277,0-14.198c-3.92-3.919-10.277-3.919-14.198,0l-80.12,80.12c-9.004,9.006-21.456,13.712-34.172,12.932
        l-4.438-0.274c-18.448-1.152-36.536,5.699-49.61,18.772L51.419,387.108C47.506,391.023,41.137,391.021,37.221,387.108z
        M68.261,398.662l28.69-28.689c15.766,21.936,35.947,40.481,59.237,54.343l-29.132,29.132
        C104.477,438.649,84.582,420.09,68.261,398.662z M150.803,486.49c-3.915,3.916-10.284,3.914-14.198,0.001
        c-3.914-3.913-3.914-10.283,0-14.197l132.019-132.018c8.024-8.025,12.149-19.119,11.315-30.436
        c-0.405-5.489,1.596-10.872,5.489-14.764l41.007-41.008c33.287-33.287,74.944-57.216,120.468-69.199l7.496-1.974L150.803,486.49z
        M256,491.922c-24.818,0-48.748-3.861-71.232-11.001l32.929-32.929c12.391,2.469,25.197,3.773,38.304,3.773
        c37.917,0,74.727-10.905,106.451-31.534c30.887-20.085,55.439-48.295,70.999-81.58c2.348-5.023,0.181-10.998-4.842-13.346
        c-5.025-2.35-10.999-0.181-13.346,4.842C386.423,391.83,323.909,431.686,256,431.686c-7.025,0-13.952-0.424-20.762-1.235
        l245.679-245.678c7.138,22.484,11.005,46.41,11.005,71.226C491.922,386.087,386.088,491.922,256,491.922z"
      />
    </SvgIcon>
  );
}