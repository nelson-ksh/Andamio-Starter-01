import { getSLTText } from '../../../../../lib/course';
import styles from './Lesson.module.css';
import { TemplateProps } from './common';

const LessonTemplate = ({
  frontmatter,
  moduleId,
  page,
  children,
}: TemplateProps) => {
  return (
    <div>
      <div className={styles.lessonContainer}>
        <h1>
          {frontmatter.title}: {frontmatter.description}
        </h1>
        <p className={styles.slt}>
          SLT {frontmatter.slt}: {getSLTText({ sltId: frontmatter.slt[0] })}
        </p>
        {children}
        <div>
          <h2>Placeholders:</h2>
          <p>{moduleId}</p>
          <p>{JSON.stringify(page)}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonTemplate;
