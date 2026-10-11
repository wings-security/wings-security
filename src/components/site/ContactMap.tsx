import { useState } from 'react';
import type { JSX } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { COMPANY } from '@/data/site';

export default function ContactMap(): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false);
  const query: string = encodeURIComponent(COMPANY.address);
  return <div className="contact-map">
    {loaded
      ? <iframe title="WINGS Security Dublin office location" src={`https://maps.google.com/maps?q=${query}&output=embed`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
      : <div className="map-preview"><div className="map-location"><MapPin size={34} /><strong>Dublin 15</strong><span>Blanchardstown Corporate Park</span></div><button className="button button-light" type="button" onClick={(): void => setLoaded(true)}>Load Google Maps <ArrowUpRight size={18} /></button><small>The interactive map loads from Google when selected.</small></div>}
    <a className="map-directions" href={`https://www.google.com/maps/search/?api=1&query=${query}`}>Open location & directions <ArrowUpRight size={16} /></a>
  </div>;
}
