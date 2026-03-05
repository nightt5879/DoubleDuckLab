import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_AVATAR = '/images/avatar-default.png';
const AVATAR_EXTS = ['png', 'jpg', 'svg'] as const;

type MemberLike = {
  name: string | { zh?: string; en?: string };
  avatar?: string;
};

export function resolveMemberAvatar(member: MemberLike): string {
  if (member.avatar && member.avatar.trim()) {
    return member.avatar.trim();
  }

  const rawNames = typeof member.name === 'string'
    ? [member.name]
    : [member.name.zh || '', member.name.en || ''];
  const candidateNames = Array.from(
    new Set(rawNames.map((item) => item.trim()).filter(Boolean))
  );

  if (!candidateNames.length) {
    return DEFAULT_AVATAR;
  }

  for (const candidate of candidateNames) {
    for (const ext of AVATAR_EXTS) {
      const diskPath = path.join(process.cwd(), 'public', 'member', 'images', `${candidate}.${ext}`);
      if (fs.existsSync(diskPath)) {
        return encodeURI(`/member/images/${candidate}.${ext}`);
      }
    }
  }

  return DEFAULT_AVATAR;
}
