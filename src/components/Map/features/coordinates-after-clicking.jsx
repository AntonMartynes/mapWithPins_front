import { useEffect } from 'react';
import {useMap } from 'react-leaflet';
import L from 'leaflet';

export const GetCoordinates = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const info = L.DomUtil.create('div', 'legend');

    const positon = L.Control.extend({
      options: {
        position: 'bottomleft'
      },

      onAdd: function () {
        info.textContent = 'Click on map';
        return info;
      }
    })

    map.on('click', (e) => {
      info.textContent = e.latlng;
    })

    map.addControl(new positon());

  }, [map])


  return null

}