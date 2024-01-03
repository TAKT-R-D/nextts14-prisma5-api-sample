import styles from './licenses.module.css';
import fs from 'fs';
import path from 'path';

export function generateMetadata() {
  return {
    title: 'Licenses',
    description: 'Licenses for Production/Direct.',
  };
}

export default function License() {
  const jsonFile = path.join(
    process.cwd(),
    'src/app/licenses',
    'licenses.json'
  );
  const licenses = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

  const licenseBlock = Object.keys(licenses).map((key) => {
    const license = licenses[key];
    const content = fs.readFileSync(`${license.licenseFile}`, 'utf8');
    return (
      <div key={key} className={styles.licenseBlock}>
        <h2>
          <a href={license.repository} target="_blank" className={styles.link}>
            {key}
          </a>
        </h2>
        <ul className={styles.list}>
          <li>
            <span className={styles.item}>License:</span> {license.licenses}
          </li>
          <li>
            <span className={styles.item}>Publisher:</span>{' '}
            {license.publisher || '-'}
          </li>
          <li>
            <span className={styles.item}>License File:</span>{' '}
            {license.licenseFile}
            <br />
            <textarea
              className={styles.licenseContents}
              defaultValue={content}
            />
          </li>
        </ul>
      </div>
    );
  });

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>LICENSES</h1>
      {licenseBlock}
    </div>
  );
}
