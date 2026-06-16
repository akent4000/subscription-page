// Vendored from @kastov/cryptohapp (MIT, https://github.com/kastov/cryptohapp)
// Inlined because the package isn't published to a registry usable from a plain
// `npm install` (git installs skip its build step), and the logic is tiny.
import { publicEncrypt } from 'node:crypto';

const RSA_PKCS1_PADDING = 1;

const HAPP_PUBLIC_KEY_V4 = `
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA3UZ0M3L4K+WjM3vkbQnz
ozHg/cRbEXvQ6i4A8RVN4OM3rK9kU01FdjyoIgywve8OEKsFnVwERZAQZ1Trv60B
hmaM76QQEE+EUlIOL9EpwKWGtTL5lYC1sT9XJMNP3/CI0gP5wwQI88cY/xedpOEB
W72EmOOShHUm/b/3m+HPmqwc4ugKj5zWV5SyiT829aFA5DxSjmIIFBAms7DafmSq
LFTYIQL5cShDY2u+/sqyAw9yZIOoqW2TFIgIHhLPWek/ocDU7zyOrlu1E0SmcQQb
LFqHq02fsnH6IcqTv3N5Adb/CkZDDQ6HvQVBmqbKZKf7ZdXkqsc/Zw27xhG7OfXC
tUmWsiL7zA+KoTd3avyOh93Q9ju4UQsHthL3Gs4vECYOCS9dsXXSHEY/1ngU/hjO
WFF8QEE/rYV6nA4PTyUvo5RsctSQL/9DJX7XNh3zngvif8LsCN2MPvx6X+zLouBX
zgBkQ9DFfZAGLWf9TR7KVjZC/3NsuUCDoAOcpmN8pENBbeB0puiKMMWSvll36+2M
YR1Xs0MgT8Y9TwhE2+TnnTJOhzmHi/BxiUlY/w2E0s4ax9GHAmX0wyF4zeV7kDkc
vHuEdc0d7vDmdw0oqCqWj0Xwq86HfORu6tm1A8uRATjb4SzjTKclKuoElVAVa5Jo
oh/uZMozC65SmDw+N5p6Su8CAwEAAQ==
-----END PUBLIC KEY-----
`;

const HAPP_DEEP_LINK_V4 = 'happ://crypt4/';

/**
 * Encrypts a subscription URL with Happ's public key and returns the full
 * `happ://crypt4/...` deep link, or null on encryption failure.
 */
export function createHappCryptoLink(content: string): string | null {
    try {
        const encrypted = publicEncrypt(
            { key: HAPP_PUBLIC_KEY_V4, padding: RSA_PKCS1_PADDING },
            Buffer.from(content),
        );

        return HAPP_DEEP_LINK_V4 + encrypted.toString('base64');
    } catch {
        return null;
    }
}
