import { css, StyleSheet } from 'aphrodite/no-important';
import commonStyles from '@styles/commonStyles';
import { base } from '@styles/colors';

export interface IUserBarProps {
  clickHandler(e: React.MouseEvent<any>): any;
  profilePicUrl?: string;
  name?: string;
}

const UserBar = (props: IUserBarProps): JSX.Element => {
  return (
    <div className={css([commonStyles.flexRow, styles.footer])}>
      <div className={css([commonStyles.flexRow, styles.clickable])}
        onClick={props.clickHandler}
      >
        <img
          src={props.profilePicUrl || '/assets/guest_avatar.svg'}
          className={css(styles.avatarImg)}
          alt='Avatar'
        />
        <p className={css(styles.nameText)}>
          {props.name || 'Guest' }
        </p>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '11vmin',
    width: '100%',
    alignItems: 'flex-end',
    marginLeft: '4.58375vmin',
    marginBottom: '4.58375vmin'
  },

  clickable: {
    cursor: 'pointer',
    alignItems: 'flex-end'
  },

  avatarImg: {
    width: '4.58375vmin',
    height: '4.58375vmin',
    borderRadius: '50%'
  },

  nameText: {
    fontSize: '3vmin',
    color: base.lumosBlack,
    fontWeight: 500,
    fontFamily: 'MuseoSans500',
    margin: 0,
    marginLeft: '1.5825vmin'
  },
});

export default UserBar;
